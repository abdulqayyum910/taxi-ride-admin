import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function EditRide({
  editData,
  saveChangeEdit,
  handleClose,
  deleteRide,
}) {
  const [state, setState] = useState({
    startingPointLocation: editData.startingPointLocation
      ? editData.startingPointLocation.toString()
      : '',
    endpointLocation: editData.endpointLocation
      ? editData.endpointLocation.toString()
      : '',
    notice: editData.notice ? editData.notice.toString() : '',
    price: editData.price ? editData.price.toString() : '',
    paymentMethod: editData.paymentMethod
      ? editData.paymentMethod.toString()
      : '',

    carName: editData.carName,
    driverName: editData.driverName ? editData.driverName : '',
  });

  const saveChanges = async () => {
    let {
      startingPointLocation,
      endpointLocation,
      notice,
      price,
      paymentMethod,
    } = state;

    let obj = {
      ...state,
      startingPointLocation,
      endpointLocation,
      notice,
      price: Number(price),
      paymentMethod,
    };

    saveChangeEdit(editData.key, obj);
  };

  const onChangeHandler = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };
  return (
    <Modal
      show={editData !== null ? true : false}
      onHide={handleClose}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Ride ID:{editData.rideId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className='mb-3'>
          <InputGroup.Text>Starting Point</InputGroup.Text>
          <Form.Control
            value={state.startingPointLocation}
            id='startingPointLocation'
            aria-label='Starting Point'
            onChange={onChangeHandler}
          />
        </InputGroup>

        <InputGroup className='mb-3'>
          <InputGroup.Text>Starting Point</InputGroup.Text>
          <Form.Control
            value={state.endpointLocation}
            id='endpointLocation'
            aria-label='Ending Point'
            onChange={onChangeHandler}
          />
        </InputGroup>

        <InputGroup className='mb-3'>
          <InputGroup.Text>Price</InputGroup.Text>
          <Form.Control
            value={state.price}
            id='price'
            aria-label='Price'
            onChange={onChangeHandler}
          />
        </InputGroup>

        <InputGroup className='mb-3'>
          <InputGroup.Text>Notice</InputGroup.Text>
          <Form.Control
            value={state.notice}
            id='notice'
            aria-label='Notice'
            onChange={onChangeHandler}
          />
        </InputGroup>

        <InputGroup className='mb-3'>
          <InputGroup.Text>Payment Method</InputGroup.Text>

          <Form.Select
            aria-label='Default select example'
            value={state.paymentMethod}
            onChange={onChangeHandler}
            id='paymentMethod'
          >
            <option value='cash'>Cash</option>
            <option value='card'>Card</option>
            <option value='no payment'>No Payment</option>
          </Form.Select>
        </InputGroup>

        <InputGroup className='mb-3'>
          <InputGroup.Text>Car Name</InputGroup.Text>

          <Form.Select
            aria-label='Default select example'
            value={state.carName}
            onChange={onChangeHandler}
            id='carName'
          >
            {' '}
            {!state.carName ? <option>all</option> : null}
            <option value='PK12'>PK12</option>
            <option value='kar'>kar</option>
          </Form.Select>
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Text>Driver Name</InputGroup.Text>

          <Form.Select
            aria-label='Default select example'
            value={state.driverName}
            onChange={onChangeHandler}
            id='driverName'
          >
            {!state.driverName ? <option value='none'>none</option> : null}
            <option value='PK'>PK</option>
            <option value='RR'>RR</option>
          </Form.Select>
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={saveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
