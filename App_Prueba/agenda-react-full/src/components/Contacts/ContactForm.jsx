import React, { useState } from 'react'

export default function ContactForm({ onAdd }) {
  const [form, setForm] = useState({ nombre: '', apellido: '', telefono: '' })
  const [saving, setSaving] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.nombre || !form.telefono) {
      alert('Nombre y teléfono son obligatorios')
      return
    }
    setSaving(true)
    try {
      await onAdd(form)
      setForm({ nombre: '', apellido: '', telefono: '' })
    } catch (err) {
      console.error(err)
      alert('Error guardando contacto')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="form-section">
      <h3>Agrega un nuevo contacto</h3>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input name="nombre" value={form.nombre} onChange={handleChange} type="text" placeholder="Nombre" />

        <label>Apellido</label>
        <input name="apellido" value={form.apellido} onChange={handleChange} type="text" placeholder="Apellido" />

        <label>Teléfono</label>
        <input name="telefono" value={form.telefono} onChange={handleChange} type="tel" placeholder="Teléfono" />

        <button className="primary-button" type="submit" disabled={saving}>
          {saving ? 'Guardando...' : 'Guardar Contacto'}
        </button>
      </form>
    </section>
  )
}
