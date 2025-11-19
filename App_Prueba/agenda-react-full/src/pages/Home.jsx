import React, { useEffect, useState } from 'react'
import ContactForm from '../components/Contacts/ContactForm'
import ContactList from '../components/Contacts/ContactList'
import { getContacts, createContact, deleteContact } from '../services/contactsApi'

export default function Home(){
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const data = await getContacts()
      setContacts(data)
    } catch (err) {
      console.error('Error loading contacts', err)
      setContacts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleAdd = async (contact) => {
    await createContact(contact)
    await load()
  }

  const handleDelete = async (id) => {
    await deleteContact(id)
    await load()
  }

  return (
    <div className="container">
      <header className="agenda-header">
        <img src="/png.icon.png" alt="icon" className="header-icon" />
        <h1>Agenda WEB</h1>
      </header>

      <div className="main-content-flex">
        <ContactForm onAdd={handleAdd} />
        <ContactList contactos={contacts} loading={loading} onDelete={handleDelete} />
      </div>

      <footer>
        <div className="footer-icon-container"></div>
      </footer>
    </div>
  )
}
