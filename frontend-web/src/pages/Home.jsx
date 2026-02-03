import { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import {
  getServicios,
  crearServicio,
  actualizarServicio,
} from "../services/api";

import Loading from "../components/Loading";
import Toast from "../components/ToastX";
import ServiceForm from "../components/ServiceForm";
import SearchBox from "../components/SearchBox";
import ServiceCard from "../components/ServiceCard";
import "bootstrap-icons/font/bootstrap-icons.css";
import PaginationComponent from "../components/Pagination";
import Modal from "../components/Modal";
import EditServicesForm from "../components/EditServicesForm";

function Home() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [toast, setToast] = useState({ type: "", text: "" });
  const ITEMS_PER_PAGE = 8;
  const [page, setPage] = useState(1);

  const [editOpen, setEditOpen] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  const [actualizando, setActualizando] = useState(false);

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast({ type: "", text: "" }), 3000);
  };

  const cargar = () => {
    setLoading(true);
    getServicios()
      .then((data) => setServicios(data))
      .catch(() => showToast("error", "No se pudieron cargar los servicios."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    cargar();
  }, []);

  const guardarServicio = async (payload) => {
    try {
      setGuardando(true);
      await crearServicio(payload);
      showToast("success", "Servicio creado correctamente.");

      await cargar();

      return true;
    } catch (err) {
      showToast("error", err.message || "Error creando servicio.");
      return false;
    } finally {
      setGuardando(false);
    }
  };

  const abrirEdicion = (servicio) => {
    setSeleccionado(servicio);
    setEditOpen(true);
  };

  const guardarCambios = async (payload) => {
    try {
      setActualizando(true);
      await actualizarServicio(seleccionado.id, payload);
      showToast("success", "Servicio actualizado correctamente.");
      setEditOpen(false);
      setSeleccionado(null);
      cargar();
      return true;
    } catch (e) {
      showToast("error", e.message || "Error actualizando");
      return false;
    } finally {
      setActualizando(false);
    }
  };

  const filtrados = servicios.filter(
    (s) =>
      s.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      s.descripcion.toLowerCase().includes(filtro.toLowerCase()),
  );

  const totalPages = Math.ceil(filtrados.length / ITEMS_PER_PAGE);
  const serviciosPaginados = filtrados.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  if (loading) return <Loading />;

  return (
    <div
      data-bs-theme="dark"
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        backgroundColor: "#212529",
      }}
      className="text-light"
    >
      <div
        className="bg-primary text-light"
        style={{ width: "100%", padding: "1rem 0" }}
      ></div>
      <div className="bg-dark text-light " style={{ margin: 0 }}>
        <Container className="pt-4">
          <h2>Servicios TI</h2>
        </Container>
      </div>

      <Toast
        type={toast.type}
        text={toast.text}
        onClose={() => setToast({ type: "", text: "" })}
      />

      <Container className="mt-4">
        <Row>
          <Col md="4">
            <SearchBox
              value={filtro}
              onChange={setFiltro}
              onEdit={abrirEdicion}
            />
          </Col>

          <Col md="8">
            <ServiceForm onGuardar={guardarServicio} loading={guardando} />
          </Col>
        </Row>
      </Container>

      {filtrados.length === 0 && <p>No hay resultados</p>}

      <Container className="mt-4">
        <Row>
          {serviciosPaginados.map((s) => (
            <Col key={s.id} xs="12" sm="6" md="4" lg="3" className="mb-4">
              <ServiceCard servicio={s} onEdit={abrirEdicion} />
            </Col>
          ))}
        </Row>
      </Container>
      <Container className="mt-5 d-flex justify-content-center">
        <PaginationComponent
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      </Container>

      <Modal
        open={editOpen}
        title="Editar Servicio"
        onClose={() => setEditOpen(false)}
        body={
          <EditServicesForm
            className="bg-dark text-light"
            servicio={seleccionado}
            onGuardar={guardarCambios}
            loading={actualizando}
          />
        }
        footer={
          <>
            <button
              type="submit"
              form="edit-service-form"
              className="btn btn-primary"
              disabled={actualizando}
            >
              {actualizando ? "Actualizando..." : "Guardar cambios"}
            </button>

            <button
              className="btn btn-secondary ms-2"
              onClick={() => setEditOpen(false)}
            >
              {"Cancelar"}
            </button>
          </>
        }
      />
      {/* <ServiceEditForm
          servicio={seleccionado}
          onGuardar={guardarCambios}
          loading={actualizando}
        /> */}
    </div>
  );
}
export default Home;
