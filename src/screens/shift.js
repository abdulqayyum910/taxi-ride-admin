import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore/lite';
import { db } from '../firebase/firebase';
import './style.css';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import { edit } from 'react-icons-kit/entypo/edit';
import { deleteIconic } from 'react-icons-kit/iconic/deleteIconic';
import { Icon } from 'react-icons-kit';
import EditModal from '../components/edit_shift_modal';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import Header from '../components/header';
import DeletePopup from '../components/deletePopup';

export default function Shift(props) {
  const [state, setState] = useState({
    shifts: [],
    loading: false,
    error: '',
    shiftType: 'all',
    previousShift: [],
    shift_status: 'all',
    shiftId: '',
    carName: 'all',
    driverName: 'all',
    editData: null,
    date: '',
    deleteKey: null,
  });

  const navigation = useNavigate();

  const getAllShifts = async (filterShiftId) => {
    let shiftsArray = [];
    try {
      setState({ ...state, loading: true });
      let shifts = await getDocs(
        query(collection(db, 'shift'), orderBy('startingTime', 'desc'))
      );

      for (var snap of shifts.docs) {
        const data = snap.data();
        data.key = snap.id;
        shiftsArray.push(data);
      }

      if (shiftsArray.length === shifts.docs.length) {
        setState({
          ...state,
          loading: false,
          shifts: shiftsArray,
          previousShift: shiftsArray,
          editData: null,
          driverName: 'all',
          carName: 'all',
          shiftType: 'all',
          shiftId: '',
          date: '',
          deleteKey: null,
        });
      }
    } catch (err) {
      console.log(err.message);
      setState({ ...state, loading: false });
    }
  };

  const onChangeShiftType = async (e) => {
    let shiftsArray = [];

    setState({ ...state, shiftType: e.target.value });
    if (e.target.value === 'all') {
      return;
      //getAllShifts();
    }
    try {
      setState({
        ...state,
        loading: true,
        shifts: [],
        shiftType: e.target.value,
      });

      const queryConstraints = [where('shiftType', '==', e.target.value)];

      if (state.shiftId) {
        queryConstraints.push(where('shiftId', '==', Number(state.shiftId)));
      }

      if (state.carName !== 'all') {
        queryConstraints.push(where('carName', '==', state.carName));
      }
      if (state.driverName !== 'all') {
        queryConstraints.push(where('driverName', '==', state.driverName));
      }

      let shifts = await getDocs(
        query(
          collection(db, 'shift'),

          ...queryConstraints
          //  where('shift_status', '==', {})
        )
      );

      for (var snap of shifts.docs) {
        const data = snap.data();
        data.key = snap.id;
        shiftsArray.push(data);
      }

      if (shiftsArray.length === shifts.docs.length) {
        setState({
          ...state,
          loading: false,
          shifts: shiftsArray,
          previousShift: shiftsArray,
          shiftType: e.target.value,
        });
      }
    } catch (err) {
      console.log(err.message);
      setState({ ...state, loading: false });
    }
  };

  const onChangeCarName = async (e) => {
    let shiftsArray = [];

    let value = e.target.value;
    setState({ ...state, carName: value });
    if (e.target.value === 'all') {
      return;

      //getAllShifts(Number(state.shiftId));
    }

    try {
      setState({ ...state, loading: true, shifts: [] });

      const queryConstraints = [where('carName', '==', value)];

      if (state.shiftId) {
        queryConstraints.push(where('shiftId', '==', Number(state.shiftId)));
      }

      if (state.shiftType !== 'all') {
        queryConstraints.push(where('shiftType', '==', state.shiftType));
      }
      if (state.driverName !== 'all') {
        queryConstraints.push(where('driverName', '==', state.driverName));
      }

      let shifts = await getDocs(
        query(
          collection(db, 'shift'),

          ...queryConstraints
          //  where('shift_status', '==', {})
        )
      );

      for (var snap of shifts.docs) {
        const data = snap.data();
        data.key = snap.id;
        shiftsArray.push(data);
      }

      if (shiftsArray.length === shifts.docs.length) {
        setState({
          ...state,
          loading: false,
          shifts: shiftsArray,
          previousShift: shiftsArray,
          carName: value,
        });
      }
    } catch (err) {
      console.log(err.message);
      setState({ ...state, loading: false });
    }
  };

  const searchByShiftId = (e) => {
    let value = Number(e.target.value);
    setState({ ...state, shiftId: e.target.value });
    const { shifts, previousShift } = state;

    if (e.target.value === '') {
      return setState({
        ...state,
        shifts: previousShift,
        shiftId: e.target.value,
      });
    }

    if (e.target.value !== '') {
      let filterShiftsByShiftId = shifts.filter((val) => val.shiftId === value);
      if (!filterShiftsByShiftId.length) {
        return setState({
          ...state,
          shifts: [],
          shiftId: e.target.value,
        });
      }

      return setState({
        ...state,
        shifts: filterShiftsByShiftId,
        previousShift: shifts,
        shiftId: e.target.value,
      });
    }
  };

  const onChangeDriverName = async (e) => {
    let value = e.target.value;
    setState({ ...state, driverName: value });

    let shiftsArray = [];

    if (e.target.value === 'all') {
      return;

      //getAllShifts(Number(state.shiftId));
    }

    try {
      setState({ ...state, loading: true, shifts: [] });

      const queryConstraints = [where('driverName', '==', value)];

      if (state.shiftId) {
        queryConstraints.push(where('shiftId', '==', Number(state.shiftId)));
      }

      if (state.shiftType !== 'all') {
        queryConstraints.push(where('shiftType', '==', state.shiftType));
      }
      if (state.carName !== 'all') {
        queryConstraints.push(where('carName', '==', state.carName));
      }

      let shifts = await getDocs(
        query(
          collection(db, 'shift'),

          ...queryConstraints
          //  where('shift_status', '==', {})
        )
      );

      for (var snap of shifts.docs) {
        const data = snap.data();
        data.key = snap.id;
        shiftsArray.push(data);
      }

      if (shiftsArray.length === shifts.docs.length) {
        setState({
          ...state,
          loading: false,
          shifts: shiftsArray,
          previousShift: shiftsArray,
          driverName: value,
        });
      }
    } catch (err) {
      console.log(err.message);
      setState({ ...state, loading: false });
    }
  };

  const getFilterShift = async () => {
    let shiftsArray = [];
    try {
      setState({ ...state, loading: true, shifts: [] });
      const queryConstraints = [];
      if (state.driverName) {
        queryConstraints.push(where('driverName', '==', state.driverName));
      }

      if (state.shiftId) {
        queryConstraints.push(where('shiftId', '==', Number(state.shiftId)));
      }

      if (state.shiftType !== 'all') {
        queryConstraints.push(where('shiftType', '==', state.shiftType));
      }
      if (state.carName !== 'all') {
        queryConstraints.push(where('carName', '==', state.carName));
      }

      let shifts = await getDocs(
        query(
          collection(db, 'shift'),

          ...queryConstraints
          //  where('shift_status', '==', {})
        )
      );

      for (var snap of shifts.docs) {
        const data = snap.data();
        data.key = snap.id;
        shiftsArray.push(data);
      }

      if (shiftsArray.length === shifts.docs.length) {
        setState({
          ...state,
          loading: false,
          shifts: shiftsArray,
          previousShift: shiftsArray,
          editData: null,
        });
      }
    } catch (err) {
      console.log(err.message);
      setState({ ...state, loading: false });
    }
  };

  const onSelectDate = async (e) => {
    const { previousShift } = state;
    let value = e.target.value;
    setState({ ...state, date: value });

    let filterDateShift = previousShift.filter(
      (val) =>
        moment(val.startingTime).format('MMM Do YY') ===
        moment(value).format('MMM Do YY')
    );

    if (!filterDateShift.length) {
      return setState({
        ...state,
        shifts: [],
        previousShift: state.previousShift,
        date: e.target.value,
      });
    }

    return setState({
      ...state,
      shifts: filterDateShift,
      previousShift: previousShift,
      date: e.target.value,
    });
  };

  const navigateTo = (shiftId, data) => {
    localStorage.setItem('shift', JSON.stringify({ ...data }));
    navigation(`/shift/${shiftId}`);
  };

  // const openEditModal = (data) => {
  //   setState({ ...state, editData: data });
  // };

  const handleClose = () =>
    setState({ ...state, editData: null, deleteKey: null });

  // const saveChangeEdit = async (key, data) => {
  //   try {
  //     await updateDoc(doc(db, 'shift', key), data);
  //     if (
  //       state.carName === 'all' &&
  //       state.driverName === 'all' &&
  //       state.shiftType === 'all' &&
  //       !state.shiftId
  //     ) {
  //       getAllShifts();
  //       return handleClose();
  //     }
  //     getFilterShift();
  //     handleClose();
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  const deleteShift = async (key) => {
    try {
      await deleteDoc(doc(db, 'shift', key));

      if (
        state.carName === 'all' &&
        state.driverName === 'all' &&
        state.shiftType === 'all' &&
        !state.shiftId
      ) {
        return getAllShifts();
      }
      getFilterShift();
    } catch (err) {
      console.log(err.message);
    }
  };

  const clearFilter = () => {
    setState({
      ...state,
      shiftId: '',
      shiftType: 'all',
      carName: 'all',
      driverName: 'all',
      date: '',
    });

    getAllShifts();
  };

  const openDeleteModal = (shiftKey) => {
    setState({ ...state, deleteKey: shiftKey });
  };

  useEffect(() => {
    getAllShifts();
  }, []);

  return (
    <>
      <Header />
      <div className='container my-container'>
        <h1 style={{ margin: '20px 0', fontWeight: 'bold' }}>Shifts</h1>

        <DeletePopup
          onDelete={deleteShift}
          deleteKey={state.deleteKey}
          handleClose={handleClose}
        />

        {/* {state.editData ? (
          <EditModal
            saveChangeEdit={saveChangeEdit}
            editData={state.editData}
            handleClose={handleClose}
            deleteShift={deleteShift}
          />
        ) : null} */}
        <div className='shift-filter-container'>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Shift ID</Form.Label>
            <Form.Control
              onChange={searchByShiftId}
              type='text'
              placeholder='Search by Shift ID'
              value={state.shiftId}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Shift Type</Form.Label>
            <Form.Select
              aria-label='Default select example'
              value={state.shiftType}
              onChange={onChangeShiftType}
            >
              <option value='all'>all</option>
              <option value='Day'>Day</option>
              <option value='Night'>Night</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Car Name</Form.Label>
            <Form.Select
              aria-label='Default select example'
              onChange={onChangeCarName}
              value={state.carName}
            >
              <option value='all'>all</option>
              <option value='PK12'>PK12</option>
              <option value='kar'>Kar</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Driver Name</Form.Label>
            <Form.Select
              aria-label='Default select example'
              onChange={onChangeDriverName}
              value={state.driverName}
            >
              <option value='all'>all</option>
              <option value='PK'>PK</option>
              <option value='RR'>RR</option>
              <option value='David'>David</option>
              <option value='Tester'>Tester</option>
              <option value='Paiman'>Paiman</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Date</Form.Label>
            <Form.Control
              onChange={onSelectDate}
              type='date'
              placeholder='Search by date'
              value={state.date}
            />
          </Form.Group>
          {/* <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Shift Status</Form.Label>
          <Form.Select
            aria-label='Default select example'
            onChange={onChangeShiftStatus}
            value={state.shift_status}
          >
            <option>all</option>
            <option value='open'>open</option>
            <option value='closed'>closed</option>
          </Form.Select>
        </Form.Group> */}
          <Button
            variant='default'
            style={{
              marginTop: 20,
              fontSize: 18,
              color: 'red',
              fontWeight: '500',
            }}
            size='sm'
            onClick={clearFilter}
          >
            Clear filters
          </Button>
        </div>

        <Table striped bordered hover style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Shift ID</th>
              <th>Shift Type</th>
              <th>Car Name</th>
              <th>Driver Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {state.shifts.length
            ? state.shifts.map((val, i) => (
                <tbody key={i}>
                  <tr className='link'>
                    <td onClick={() => navigateTo(val.shiftId, val)}>
                      {i + 1}
                    </td>
                    <td onClick={() => navigateTo(val.shiftId, val)}>
                      {val.shiftId}
                    </td>
                    <td onClick={() => navigateTo(val.shiftId, val)}>
                      {val.shiftType}
                    </td>
                    <td onClick={() => navigateTo(val.shiftId, val)}>
                      {val.carName}
                    </td>
                    <td onClick={() => navigateTo(val.shiftId, val)}>
                      {val.driverName}
                    </td>
                    <td onClick={() => navigateTo(val.shiftId, val)}>
                      {moment(val.startingTime).format('L')}
                    </td>
                    <td onClick={() => navigateTo(val.shiftId, val)}>
                      {val.shift_status}
                    </td>
                    <td>
                      {/* <Icon
                        onClick={() => openEditModal(val)}
                        icon={edit}
                        className='icon'
                        size={20}
                        style={{ color: 'grey', cursor: 'pointer' }}
                      /> */}
                      <Icon
                        //  onClick={() => deleteShift(val.key)}
                        onClick={() => openDeleteModal(val.key, i)}
                        icon={deleteIconic}
                        className='icon'
                        size={20}
                        style={{ color: 'red', cursor: 'pointer' }}
                      />
                    </td>
                  </tr>
                </tbody>
              ))
            : null}
        </Table>
        {state.loading ? (
          <div className='loading'>
            <Spinner animation='border' size='sm' />
          </div>
        ) : null}
      </div>
    </>
  );
}
