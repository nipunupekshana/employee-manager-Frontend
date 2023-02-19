import { Modal, Button } from 'react-bootstrap';

function ConfirmationModal({ title, body, confirmText, cancelText, show, onConfirm, onCancel, disabled }) {
  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>{cancelText}</Button>
        <Button variant="danger" disabled={disabled} onClick={onConfirm}>{confirmText}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;