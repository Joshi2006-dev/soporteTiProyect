import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function Modalx({ open, title, body, footer, onClose }) {
  if (!open) return null;
  const toggle = () => onClose();
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle} className="bg-primary text-light">
        {title}
      </ModalHeader>

      <ModalBody className="bg-dark text-light" data-bs-theme="dark">
        {body}
      </ModalBody>

      <ModalFooter className="bg-dark text-light">{footer}</ModalFooter>
    </Modal>
  );
}

export default Modalx;
