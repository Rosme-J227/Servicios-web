import axios from 'axios';

const API_BASE = "http://localhost:3001/contactos";

export async function getContacts() {
  const res = await axios.get(API_BASE);
  return res.data;
}

export async function createContact(contact) {
  const res = await axios.post(API_BASE, contact, {
    headers: { 'Content-Type': 'application/json' }
  });
  return res.data;
}

export async function deleteContact(id) {
  const res = await axios.delete(`${API_BASE}/${id}`);
  return res.data;
}
