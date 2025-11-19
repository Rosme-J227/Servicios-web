import React from 'react'
import ContactItem from './ContactItem'

export default function ContactList({ contactos, loading, onDelete }) {
  return (
    <section className="list-section">
      <h3>Listado de Contactos</h3>
      {loading ? <p id="load-message">Cargando contactos...</p> : (
        <ul id="contact-list">
          {contactos.length === 0 ? <p className="text-muted">No hay contactos aún.</p> : contactos.map(c => (
            <ContactItem key={c.id || c.telefono} contacto={c} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </section>
  )
}
