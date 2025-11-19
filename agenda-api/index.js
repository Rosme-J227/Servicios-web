const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());

const FILE = path.join(__dirname, 'contactos.json');

function load() {
  try { 
    const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
    console.log('✓ Contactos cargados:', data.length);
    return data;
  } catch (err) { 
    console.log('⚠ Error al leer archivo, retornando array vacío');
    return []; 
  }
}

function save(data) {
  try {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf8');
    console.log('✓ Contactos guardados. Total:', data.length);
  } catch (err) {
    console.error('✗ Error al guardar:', err.message);
  }
}

function generateId() {
  return Math.floor(Math.random() * 10000) + Date.now();
}

app.get('/contactos', (req, res) => {
  const contactos = load();
  console.log('GET /contactos - Enviando', contactos.length, 'contactos');
  res.json(contactos);
});

app.post('/contactos', (req, res) => {
  console.log('POST /contactos - Datos recibidos:', req.body);
  const contactos = load();
  const nuevoContacto = { ...req.body, id: generateId() };
  console.log('✓ Nuevo contacto creado con ID:', nuevoContacto.id);
  contactos.push(nuevoContacto);
  save(contactos);
  res.status(201).json(nuevoContacto);
});

app.delete('/contactos/:id', (req, res) => {
  console.log('DELETE /contactos/:id - ID:', req.params.id);
  const contactos = load();
  const filtrados = contactos.filter(c => c.id != req.params.id);
  if (filtrados.length === contactos.length) {
    console.log('✗ Contacto no encontrado');
    return res.status(404).json({ error: 'Contacto no encontrado' });
  }
  console.log('✓ Contacto eliminado');
  save(filtrados);
  res.json({ mensaje: 'Contacto eliminado' });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`\n🚀 API lista en http://localhost:${PORT}\n`));
