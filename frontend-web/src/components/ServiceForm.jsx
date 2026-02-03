import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Button,
  Collapse,
} from "reactstrap";

function ServiceForm({ onGuardar, loading }, args) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [msg, setMsg] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!nombre.trim() || !descripcion.trim()) {
      setMsg("Nombre y descripción son obligatorios.");
      return;
    }
    if (nombre.trim().length < 3) {
      setMsg("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    const ok = await onGuardar({
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
    });

    if (ok) {
      setNombre("");
      setDescripcion("");
    }
  };

  return (
    <React.StrictMode>
      <div className="d-flex justify-content-end px-3 mb-3">
        <Button color="primary" onClick={toggle}>
          <i className="bi bi-plus-circle me-2"></i>
          Crear nuevo servicio
        </Button>
      </div>

      <Collapse isOpen={isOpen} {...args}>
        <div
          className="border rounded-4 p-4 mb-3 bg-dark text-light"
          data-bs-theme="dark"
        >
          <Form onSubmit={submit} style={{ marginBottom: 12 }}>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>
                Nombre del servicio
              </Label>
              <Col sm={10}>
                <Input
                  placeholder="ejemplo nombre..."
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  disabled={loading}
                  className="bg-dark text-light border-secondary"
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleText" sm={2}>
                Descripcion
              </Label>
              <Col sm={10}>
                <Input
                  name="Descripcion"
                  type="textarea"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  disabled={loading}
                  className="bg-dark text-light border-secondary"
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col sm={{ size: 10, offset: 2 }}>
                <div className="d-flex justify-content-end mb-3">
                  <Button
                    type="submit"
                    disabled={loading}
                    color="primary"
                    outline
                    className="text-light"
                  >
                    <i className="bi bi-floppy me-2"></i>
                    {loading ? " Guardando..." : " Guardar"}
                  </Button>

                  <Button
                    className="ms-2 text-light"
                    color="secondary"
                    onClick={toggle}
                    outline
                  >
                    <i className="bi bi-x-circle me-2"></i> Cancelar
                  </Button>
                </div>
              </Col>
            </FormGroup>

            {msg && <p>{msg}</p>}
          </Form>
        </div>
      </Collapse>
    </React.StrictMode>
  );
}

export default ServiceForm;
