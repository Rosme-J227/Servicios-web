import { useEffect, useState } from "react";
import { getContacts, addContact, deleteContact } from "./api";
import headerIcon from "../imagenes/circulo.png";

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    telefono: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (err) {
      console.error('Error al cargar contactos:', err);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!form.nombre || !form.apellido || !form.telefono) {
      alert('Todos los campos son requeridos');
      return;
    }

    setSaving(true);
    try {
      const nuevoContacto = await addContact(form);
      setContacts([...contacts, nuevoContacto]);

      setForm({
        nombre: "",
        apellido: "",
        telefono: ""
      });
    } catch (err) {
      console.error('Error al agregar contacto:', err);
      alert('Error al guardar contacto');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
      return;
    }
    try {
      await deleteContact(id);
      setContacts(contacts.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error al eliminar contacto:', err);
      alert('Error al eliminar contacto');
    }
  };

  return (
    <div className="container">
      <header className="agenda-header">
        <img src={headerIcon} className="header-icon" />
        <h1>Agenda</h1>
        <p style={{ fontSize: '14px', margin: '5px 0 0 0', color: '#666' }}>
          consumiendo servicio web http://localhost:3001/contactos
        </p>
      </header>

      <div className="main-content-flex">
        <div className="form-section">
          <h3>Agregar Contacto</h3>

          <label>Nombre</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ingresa el nombre"
            disabled={saving}
          />

          <label>Apellido</label>
          <input
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            placeholder="Ingresa el apellido"
            disabled={saving}
          />

          <label>Teléfono</label>
          <input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Ingresa el teléfono"
            disabled={saving}
          />

          <button 
            className="primary-button" 
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>

        <div className="list-section">
          <h3>Contactos ({contacts.length})</h3>

          {loading ? (
            <div id="load-message">Cargando contactos...</div>
          ) : contacts.length === 0 ? (
            <div id="load-message">No hay contactos aún</div>
          ) : (
            <ul id="contact-list">
              {contacts.map((c) => (
                <li key={c.id} className="contact-item">
                  <p><strong>Nombre:</strong> {c.nombre}</p>
                  <p><strong>Apellido:</strong> {c.apellido}</p>
                  <p><strong>Teléfono:</strong> {c.telefono}</p>
                  {c.id && (
                    <button 
                      className="primary-button" 
                      onClick={() => handleDelete(c.id)}
                      style={{ marginTop: '8px', backgroundColor: '#dc3545' }}
                    >
                      Eliminar
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <footer>
        <div className="footer-icon-container"></div>
      </footer>
    </div>
  );
}

export default App;
