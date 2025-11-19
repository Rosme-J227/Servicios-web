import React from 'react'

export default function ContactItem({ contacto, onDelete }) {
  return (
    <li className="contact-item">
      <p><strong>Nombre:</strong> {contacto.nombre || contacto.name}</p>
      <p><strong>Apellido:</strong> {contacto.apellido || contacto.lastname || ''}</p>
      <p><strong>Teléfono:</strong> {contacto.telefono || contacto.phone || contacto.telefono_celular}</p>
      {onDelete && contacto.id && (
        <div style={{marginTop:8}}>
          <button className="primary-button" onClick={() => onDelete(contacto.id)}>Eliminar</button>
        </div>
      )}
    </li>
  )
}
