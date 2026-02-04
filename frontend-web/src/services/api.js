const API_URL = "http://localhost:5000/api/servicios";

export async function getServicios() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error al cargar servicios");
  return response.json();
}

export async function crearServicio(payload) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Error creando servicio");
  }

  return res.json();
}

export async function actualizarServicio(id, payload) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Error actualizando servicio");
  }
  return res.json();
}
