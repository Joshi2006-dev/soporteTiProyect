import { useEffect, useState } from "react";

function EditServicesForm({ servicio, onGuardar, loading, renderFooter }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (servicio) {
      setNombre(servicio.nombre || "");
      setDescripcion(servicio.descripcion || "");
    }
  }, [servicio]);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!nombre.trim() || !descripcion.trim()) {
      setMsg("Nombre y descripción son obligatorios.");
      return;
    }

    const ok = await onGuardar({
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
    });

    if (!ok) setMsg("No se pudo actualizar (revisá el error).");
  };

  return (
    <form id="edit-service-form" onSubmit={submit}>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        disabled={loading}
        placeholder="Nombre"
        className="form-control mb-2"
      />

      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        disabled={loading}
        placeholder="Descripción"
        className="form-control"
      />

      {msg && <p className="text-danger mt-2">{msg}</p>}
    </form>
  );
}

export default EditServicesForm;
