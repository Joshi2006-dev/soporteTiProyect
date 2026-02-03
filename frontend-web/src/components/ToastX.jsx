import "bootstrap/dist/css/bootstrap.min.css";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import { motion, AnimatePresence } from "framer-motion";

function ToastX({ type = "info", text = "", onClose }) {
  if (!text) return null;

  if (type.toUpperCase() === "ERROR") {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1 }} // duracion de la animación al cerrar
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            zIndex: 1050,
            minWidth: "250px",
          }}
        >
          <Toast isOpen={true} className="bg-danger text-white">
            <ToastHeader icon="danger" toggle={onClose}>
              ERROR
            </ToastHeader>
            <ToastBody>{text}</ToastBody>
          </Toast>
        </motion.div>
      </AnimatePresence>
    );
  } else {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1 }} // duracion de la animación al cerrar
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            zIndex: 1050,
            minWidth: "250px",
          }}
        >
          <Toast isOpen={true} className="bg-success text-white">
            <ToastHeader icon="success" toggle={onClose}>
              SUCCESS
            </ToastHeader>
            <ToastBody>{text}</ToastBody>
          </Toast>
        </motion.div>
      </AnimatePresence>
    );
  }
}

export default ToastX;
