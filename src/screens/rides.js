import React, { useEffect, useState } from 'react';

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
import { useLocation } from 'react-router-dom';

import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { Icon } from 'react-icons-kit';
import { edit } from 'react-icons-kit/entypo/edit';
import { deleteIconic } from 'react-icons-kit/iconic/deleteIconic';
import EditRide from '../components/edit_ride_modal';
import moment from 'moment';
import Header from '../components/header';
import { Button } from 'react-bootstrap';
import DeletePopup from '../components/deletePopup';

export default function Rides() {
  const [state, setState] = useState({
    rides: [],
    driverName: 'all',
    carName: 'all',
    paymentMethod: 'all',
    date: '',
    startingPoint: '',
    endingPoint: '',
    notice: '',
    loading: false,
    prevRides: [],
    rideId: '',
    deleteKey: null,
  });

  const getAllRides = async () => {
    let ridesArray = [];
    try {
      setState({ ...state, loading: true });
      const rides = await getDocs(query(collection(db, 'rides')));

      for (var ride of rides.docs) {
        const data = ride.data();
        data.key = ride.id;

        ridesArray.push(data);
      }

      if (rides.docs.length === ridesArray.length) {
        setState({
          ...state,
          rides: ridesArray,
          prevRides: ridesArray,
          loading: false,
          editData: null,
          deleteKey: null,
          driverName: 'all',
          startingPoint: '',
          endingPoint: '',
          notice: '',
          rideId: '',
          paymentMethod: 'all',
          carName: 'all',
          date: '',
        });
      }
    } catch (err) {
      setState({ ...state, loading: false });
      console.log(err.message);
    }
  };

  const onChangePaymentMethod = async (e) => {
    let ridesArray = [];

    let value = e.target.value;
    console.log(value);
    setState({ ...state, carName: value });
    if (e.target.value === 'all') {
      return;

      //getAllShifts(Number(state.shiftId));
    }

    try {
      setState({ ...state, loading: true, shifts: [] });

      const queryConstraints = [where('paymentMethod', '==', value)];

      if (state.rideId) {
        queryConstraints.push(where('rideId', '==', Number(state.rideId)));
      }

      if (state.driverName !== 'all') {
        queryConstraints.push(where('driverName', '==', state.driverName));
      }
      if (state.carName !== 'all') {
        queryConstraints.push(where('carName', '==', state.carName));
      }

      let rides = await getDocs(
        query(
          collection(db, 'rides'),

          ...queryConstraints
          //  where('shift_status', '==', {})
        )
      );

      for (var snap of rides.docs) {
        const data = snap.data();
        data.key = snap.id;
        ridesArray.push(data);
      }

      if (ridesArray.length === rides.docs.length) {
        setState({
          ...state,
          loading: false,
          rides: ridesArray,
          prevRides: ridesArray,
          paymentMethod: value,
        });
      }
    } catch (err) {
      console.log(err.message);
      setState({ ...state, loading: false });
    }
  };

  const searchByRideId = (e) => {
    let value = Number(e.target.value);
    setState({ ...state, rideId: e.target.value });
    const { rides, prevRides } = state;

    if (e.target.value === '') {
      return setState({
        ...state,
        rides: prevRides,
        rideId: e.target.value,
      });
    }

    if (e.target.value !== '') {
      let filterRidesByRideId = prevRides.filter((val) => val.rideId === value);

      if (!filterRidesByRideId.length) {
        return setState({
          ...state,
          rides: [],
          rideId: e.target.value,
        });
      }

      return setState({
        ...state,
        rides: filterRidesByRideId,
        prevRides: prevRides,
        rideId: e.target.value,
      });
    }
  };

  const onChangeDriverName = async (e) => {
    let value = e.target.value;
    setState({ ...state, driverName: value });

    let ridesArray = [];

    if (e.target.value === 'all') {
      return;

      //getAllShifts(Number(state.shiftId));
    }

    try {
      setState({ ...state, loading: true, shifts: [] });

      const queryConstraints = [where('driverName', '==', value)];

      if (state.rideId) {
        queryConstraints.push(where('rideId', '==', Number(state.rideId)));
      }

      if (state.paymentMethod !== 'all') {
        queryConstraints.push(
          where('paymentMethod', '==', state.paymentMethod)
        );
      }
      if (state.carName !== 'all') {
        queryConstraints.push(where('carName', '==', state.carName));
      }

      let rides = await getDocs(
        query(
          collection(db, 'rides'),

          ...queryConstraints
          //  where('shift_status', '==', {})
        )
      );

      for (var snap of rides.docs) {
        const data = snap.data();
        data.key = snap.id;
        ridesArray.push(data);
      }

      if (ridesArray.length === rides.docs.length) {
        setState({
          ...state,
          loading: false,
          rides: ridesArray,
          prevRides: ridesArray,
          driverName: value,
        });
      }
    } catch (err) {
      console.log(err.message);
      setState({ ...state, loading: false });
    }
  };

  const onChangeCarName = async (e) => {
    let ridesArray = [];

    let value = e.target.value;

    setState({ ...state, carName: value });
    if (e.target.value === 'all') {
      return;

      //getAllShifts(Number(state.shiftId));
    }

    try {
      setState({ ...state, loading: true, shifts: [] });

      const queryConstraints = [where('carName', '==', value)];

      if (state.rideId) {
        queryConstraints.push(where('rideId', '==', Number(state.rideId)));
      }

      // if (state.driverName !== 'all') {
      //   queryConstraints.push(where('shiftType', '==', state.driverName));
      // }
      if (state.paymentMethod !== 'all') {
        queryConstraints.push(
          where('paymentMethod', '==', state.paymentMethod)
        );
      }

      let rides = await getDocs(
        query(
          collection(db, 'rides'),

          ...queryConstraints
          //  where('shift_status', '==', {})
        )
      );

      for (var snap of rides.docs) {
        const data = snap.data();
        data.key = snap.id;
        ridesArray.push(data);
      }

      if (ridesArray.length === rides.docs.length) {
        setState({
          ...state,
          loading: false,
          rides: ridesArray,
          prevRides: ridesArray,
          carName: value,
        });
      }
    } catch (err) {
      console.log(err.message);
      setState({ ...state, loading: false });
    }
  };

  const searchStartingLocation = (e) => {
    let value = e.target.value.toLowerCase();

    const { prevRides } = state;

    if (value === '') {
      return setState({ ...state, rides: prevRides, startingPoint: value });
    }
    let filterRidesByStartingPoint = prevRides.filter((val) =>
      val.startingPointLocation.toLowerCase().startsWith(value)
    );

    if (!filterRidesByStartingPoint.length) {
      return setState({
        ...state,
        rides: [],
        prevRides: state.prevRides,
        startingPoint: value,
      });
    }

    return setState({
      ...state,
      rides: filterRidesByStartingPoint,
      prevRides: prevRides,
      startingPoint: value,
    });
  };

  const searchEndingLocation = (e) => {
    let value = e.target.value.toLowerCase();

    const { prevRides } = state;

    if (value === '') {
      return setState({ ...state, rides: prevRides, endingPoint: value });
    }
    let filterRidesByStartingPoint = prevRides.filter((val) =>
      val.endpointLocation.toLowerCase().startsWith(value)
    );

    if (!filterRidesByStartingPoint.length) {
      return setState({
        ...state,
        rides: [],
        prevRides: state.prevRides,
        endingPoint: value,
      });
    }

    return setState({
      ...state,
      rides: filterRidesByStartingPoint,
      prevRides: prevRides,
      endingPoint: value,
    });
  };

  const onSearchNotice = (e) => {
    let value = e.target.value.toLowerCase();

    const { prevRides } = state;

    if (value === '') {
      return setState({ ...state, rides: prevRides, notice: value });
    }
    let filterRidesByNotice = prevRides.filter((val) =>
      val.notice.toLowerCase().startsWith(value)
    );

    if (!filterRidesByNotice.length) {
      return setState({
        ...state,
        rides: [],
        prevRides: state.prevRides,
        notice: value,
      });
    }

    return setState({
      ...state,
      rides: filterRidesByNotice,
      prevRides: prevRides,
      notice: value,
    });
  };

  const onSelectDate = async (e) => {
    const { prevRides } = state;
    let value = e.target.value;
    setState({ ...state, date: value });

    let filterDateRides = prevRides.filter(
      (val) =>
        moment(val.endRideTime).format('MMM Do YY') ===
        moment(value).format('MMM Do YY')
    );

    if (!filterDateRides.length) {
      return setState({
        ...state,
        rides: [],
        prevRides: state.prevRides,
        date: e.target.value,
      });
    }

    return setState({
      ...state,
      rides: filterDateRides,
      prevRides: prevRides,
      date: e.target.value,
    });
  };

  const openEditModal = (data) => {
    setState({ ...state, editData: data });
  };

  const handleClose = () =>
    setState({ ...state, editData: null, deleteKey: null });

  const clearFilter = () => {
    setState({
      ...state,
      rideId: '',
      carName: 'all',
      driverName: 'all',
      date: '',
      notice: '',
      paymentMethod: 'all',
      startingPoint: '',
      endingPoint: '',
    });

    getAllRides();
  };

  const deleteRide = async (key) => {
    try {
      await deleteDoc(doc(db, 'rides', key));
      if (
        state.carName === 'all' &&
        state.driverName === 'all' &&
        state.shiftType === 'all' &&
        !state.shiftId
      ) {
        return getAllRides();
      }
      getAllRides();
    } catch (err) {
      console.log(err.message);
    }
  };

  const saveChangeEdit = async (key, data) => {
    console.log(data);
    try {
      await updateDoc(doc(db, 'rides', key), data);
      if (
        (state.carName === 'all' &&
          state.driverName === 'all' &&
          state.paymentMethod === 'all' &&
          !state.rideId &&
          !state.date &&
          !state.startingPoint,
        !state.endingPoint)
      ) {
        getAllRides();
        return handleClose();
      }

      handleClose();
    } catch (err) {
      console.log(err.message);
    }
  };

  const openDeleteModal = (shiftKey) => {
    setState({ ...state, deleteKey: shiftKey });
  };
  useEffect(() => {
    getAllRides();
  }, []);
  return (
    <div>
      <DeletePopup
        onDelete={deleteRide}
        deleteKey={state.deleteKey}
        handleClose={handleClose}
      />
      <Header />
      <div className='container'>
        <h1 style={{ margin: '20px 0', fontWeight: 'bold' }}>Rides</h1>
        {state.editData ? (
          <EditRide
            saveChangeEdit={saveChangeEdit}
            editData={state.editData}
            handleClose={handleClose}
          />
        ) : null}
        <div className='shift-filter-container'>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Ride ID</Form.Label>
            <Form.Control
              onChange={searchByRideId}
              type='text'
              placeholder='Search by Ride ID'
              value={state.rideId}
            />
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
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Starting Point</Form.Label>
            <Form.Control
              onChange={searchStartingLocation}
              type='text'
              placeholder='Search by starting point'
              value={state.startingPoint}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Ending Point</Form.Label>
            <Form.Control
              onChange={searchEndingLocation}
              type='text'
              placeholder='Search by ending point'
              value={state.endingPoint}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Notice</Form.Label>
            <Form.Control
              onChange={onSearchNotice}
              type='text'
              placeholder='Search by notice'
              value={state.notice}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Payment Method</Form.Label>
            <Form.Select
              aria-label='Default select example'
              onChange={onChangePaymentMethod}
              value={state.paymentMethod}
            >
              <option>all</option>
              <option value='cash'>cash</option>
              <option value='card'>card</option>
              <option value='no payment'>no payment</option>
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
              <option value='Driver 1'>Driver 1</option>
              <option value='Driver 2'>Driver 2</option>
              <option value='Driver 3'>Driver 3</option>
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
              <th>Ride ID</th>
              <th>Starting Point</th>
              <th>Ending Point</th>
              <th>Payment Method</th>
              <th>Driver Name</th>
              <th>Car Name</th>
              <th>Price</th>
              <th>Notice</th>
              <th>Time</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {state.rides.length
            ? state.rides.map((val, i) => (
                <tbody key={i}>
                  <tr className='link'>
                    <td>{i + 1}</td>
                    <td>{val.rideId}</td>
                    <td>{val.startingPointLocation}</td>
                    <td>{val.endpointLocation}</td>
                    <td>{val.paymentMethod}</td>
                    <td>{val.driverName}</td>
                    <td>{val.carName}</td>
                    <td>{val.price}</td>
                    <td>{val.notice}</td>
                    <td>{val.time}</td>
                    <td>{moment(val.startRideTime).format('L')}</td>
                    <td>
                      <Icon
                        onClick={() => openEditModal(val)}
                        icon={edit}
                        className='icon'
                        size={20}
                        style={{ color: 'grey', cursor: 'pointer' }}
                      />
                      <Icon
                        onClick={() => openDeleteModal(val.key)}
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
    </div>
  );
}
