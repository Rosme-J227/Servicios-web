export const API_URL = "http://localhost:3001/contactos";

export async function getContacts() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

export async function addContact(contact) {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(contact),
    headers: { "Content-Type": "application/json" }
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

export async function deleteContact(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}
