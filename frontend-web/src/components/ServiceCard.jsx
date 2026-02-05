import React from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Col,
  Button,
} from "reactstrap";
import { motion } from "framer-motion";

function ServiceCard({ servicio, onEdit }) {
  return (
    <Col sm="6">
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card
          className="my-2 bg-dark text-light border-secondary"
          style={{ width: "18rem" }}
          data-bs-theme="dark"
        >
          <CardHeader className="bg-primary text-light d-flex justify-content-between align-items-center">
            <span>Mueble</span>
            <i class="bi bi-grip-horizontal"></i>{" "}
          </CardHeader>

          <CardBody>
            <CardTitle tag="h5">{servicio.nombre}</CardTitle>
            <CardText>{servicio.descripcion}</CardText>
            <Button onClick={() => onEdit(servicio)} color="primary" outline>
              {"Editar "} <i class="bi bi-pencil-fill"></i>
            </Button>
            <Button color="secondary" outline className="mx-2">
              {"Ver detalle "} <i class="bi bi-info-circle-fill"></i>
            </Button>
          </CardBody>
        </Card>
      </motion.div>
    </Col>
  );
}

export default ServiceCard;
