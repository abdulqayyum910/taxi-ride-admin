import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function EditModal({ editData, handleClose, saveChangeEdit }) {
  const [state, setState] = useState({
    kilometerstandStart: editData.kilometerstandStart
      ? editData.kilometerstandStart.toString()
      : '',
    kilometerstandEnd: editData.kilometerstandEnd
      ? editData.kilometerstandEnd.toString()
      : '',
    f01Start: editData.f01Start ? editData.f01Start.toString() : '',
    f01End: editData.f01End ? editData.f01End.toString() : '',
    f02Start: editData.f02Start ? editData.f02Start.toString() : '',
    f02End: editData.f02End ? editData.f02End.toString() : '',
    f03Start: editData.f03Start ? editData.f03Start.toString() : '',
    f03End: editData.f03End ? editData.f03End.toString() : '',
    f12Start: editData.f12Start ? editData.f12Start.toString() : '',
    f12End: editData.f12End ? editData.f12End.toString() : '',
    a12Start: editData.a12Start ? editData.a12Start.toString() : '',
    a12End: editData.a12End ? editData.a12End.toString() : '',
    shiftType: editData.shiftType,
    carName: editData.carName,
    driverName: editData.driverName,
  });

  const saveChanges = async () => {
    let {
      kilometerstandStart,
      kilometerstandEnd,
      f01Start,
      f01End,
      f02Start,
      f02End,
      f03Start,
      f03End,
      f12Start,
      f12End,
      a12Start,
      a12End,
    } = state;

    let obj = {
      ...editData,
      ...state,
      kilometerstandStart: Number(kilometerstandStart),
      kilometerstandEnd: Number(kilometerstandEnd),
      f01Start: Number(f01Start),
      f01End: Number(f01End),
      f02Start: Number(f02Start),
      f02End: Number(f02End),
      f03Start: Number(f03Start),
      f03End: Number(f03End),
      f12Start: Number(f12Start),
      f12End: Number(f12End),
      a12Start: Number(a12Start),
      a12End: Number(a12End),
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
        <Modal.Title>Edit Shift ID:{editData.shiftId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className='mb-3'>
          <InputGroup.Text>Kilometerstand Start</InputGroup.Text>
          <Form.Control
            value={state.kilometerstandStart}
            id='kilometerstandStart'
            aria-label='Kilometerstand'
            onChange={onChangeHandler}
          />
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Text>Kilometerstand End</InputGroup.Text>
          <Form.Control
            value={state.kilometerstandEnd}
            id='kilometerstandEnd'
            aria-label='Kilometerstand End'
            onChange={onChangeHandler}
          />
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Text>F01 Start</InputGroup.Text>
          <Form.Control
            value={state.f01Start}
            id='f01Start'
            aria-label='F01'
            onChange={onChangeHandler}
          />
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Text>F01 End</InputGroup.Text>
          <Form.Control
            value={state.f01End}
            id='f01End'
            aria-label='F01'
            onChange={onChangeHandler}
          />
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Text>F02 Start</InputGroup.Text>
          <Form.Control
            value={state.f02Start}
            id='f02Start'
            aria-label='F02'
            onChange={onChangeHandler}
          />
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Text>F02 End</InputGroup.Text>
          <Form.Control
            value={state.f02End}
            id='f02End'
            aria-label='F02'
            onChange={onChangeHandler}
          />
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Text>F03 Start</InputGroup.Text>
          <Form.Control
            value={state.f03Start}
            id='f03Start'
            aria-label='F03'
            onChange={onChangeHandler}
          />
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Text>F03 End</InputGroup.Text>
          <Form.Control
            value={state.f03End}
            id='f03End'
            aria-label='F03'
            onChange={onChangeHandler}
          />
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Text>F12 Start</InputGroup.Text>
          <Form.Control
            value={state.f12Start}
            id='f12Start'
            aria-label='F12'
            onChange={onChangeHandler}
          />
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Text>F12 End</InputGroup.Text>
          <Form.Control
            value={state.f12End}
            aria-label='F12'
            id='f12End'
            onChange={onChangeHandler}
          />
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Text>A12 Start</InputGroup.Text>
          <Form.Control
            value={state.a12Start}
            aria-label='A12'
            id='a12Start'
            onChange={onChangeHandler}
          />
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Text>A12 End</InputGroup.Text>
          <Form.Control
            value={state.a12End}
            aria-label='A12'
            id='a12End'
            onChange={onChangeHandler}
          />
        </InputGroup>

        <InputGroup className='mb-3'>
          <InputGroup.Text>Shift Type</InputGroup.Text>

          <Form.Select
            aria-label='Default select example'
            value={state.shiftType}
            onChange={onChangeHandler}
            id='shiftType'
          >
            {!state.shiftType ? <option>all</option> : null}
            <option value='Day'>Day</option>
            <option value='Night'>Night</option>
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
            {!state.driverName ? <option>all</option> : null}
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
