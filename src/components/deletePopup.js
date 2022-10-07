import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function DeletePopup({ deleteKey, handleClose, onDelete }) {
  return (
    <div>
      <Modal show={deleteKey ? true : false} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='danger' onClick={() => onDelete(deleteKey)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
