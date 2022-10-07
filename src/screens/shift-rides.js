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
import EditModal from '../components/edit_shift_modal';
import DeletePopup from '../components/deletePopup';

export default function ShiftRide(props) {
  const [state, setState] = useState({
    rides: [],
    loading: false,
    prevRides: [],
    rideId: '',
    editData: null,
    editShiftData: null,
    deleteKey: null,
  });

  let params = useLocation();
  let shiftId = Number(params.pathname.slice(7, 8));

  const getAllShiftRides = async () => {
    let ridesArray = [];
    try {
      setState({ ...state, loading: true });
      const rides = await getDocs(
        query(
          collection(db, 'rides'),
          where('shiftId', '==', shiftId),
          orderBy('createdAt', 'desc')
        )
      );

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
          editShiftData: null,
          deleteKey: null,
        });
      }
    } catch (err) {
      setState({ ...state, loading: false });
      console.log(err.message);
    }
  };

  const openEditModal = (data) => {
    setState({ ...state, editData: data });
  };

  const handleClose = () =>
    setState({
      ...state,
      editData: null,
      editShiftData: null,
      deleteKey: null,
    });

  const deleteRide = async (key) => {
    try {
      await deleteDoc(doc(db, 'rides', key));
      if (
        state.carName === 'all' &&
        state.driverName === 'all' &&
        state.shiftType === 'all' &&
        !state.shiftId
      ) {
        return getAllShiftRides();
      }
      getAllShiftRides();
    } catch (err) {
      console.log(err.message);
    }
  };

  const saveChangeEdit = async (key, data) => {
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
        getAllShiftRides();
        return handleClose();
      }

      handleClose();
    } catch (err) {
      console.log(err.message);
    }
  };

  const openShiftEditModal = (data) => {
    setState({ ...state, editShiftData: data });
  };

  const saveChangeEditShift = async (key, data) => {
    try {
      console.log(key);
      await updateDoc(doc(db, 'shift', key), data);
      localStorage.setItem('shift', JSON.stringify(data));

      if (
        state.carName === 'all' &&
        state.driverName === 'all' &&
        state.shiftType === 'all' &&
        !state.shiftId
      ) {
        return handleClose();
      }
      getAllShiftRides();
      handleClose();
    } catch (err) {
      console.log(err.message);
    }
  };

  const openDeleteModal = (shiftKey) => {
    setState({ ...state, deleteKey: shiftKey });
  };
  useEffect(() => {
    getAllShiftRides();
  }, []);

  const localShift = JSON.parse(localStorage.getItem('shift'));
  return (
    <>
      <DeletePopup
        onDelete={deleteRide}
        deleteKey={state.deleteKey}
        handleClose={handleClose}
      />
      <div className='container my-container'>
        <h1 style={{ margin: '20px 0', fontWeight: 'bold' }}>
          Shift {shiftId} Information
        </h1>
        {state.editData ? (
          <EditRide
            saveChangeEdit={saveChangeEdit}
            editData={state.editData}
            handleClose={handleClose}
          />
        ) : null}

        {state.editShiftData ? (
          <EditModal
            saveChangeEdit={saveChangeEditShift}
            editData={state.editShiftData}
            handleClose={handleClose}
          />
        ) : null}
        {localShift ? (
          <div className='shift-filter-container'>
            <div
              onClick={() => openShiftEditModal(localShift)}
              className='edit-btn'
            >
              Edit
            </div>
            <div className='calulatedBox'>
              <div className='box'>
                <>
                  <label className='box-label'>
                    Kilometerstand Start:{' '}
                    <span className='box-value'>
                      {localShift.kilometerstandStart || '-'}
                    </span>
                  </label>
                  <div></div>
                </>
              </div>
              <div className='box'>
                <>
                  <label className='box-label'>
                    Kilometerstand End:{' '}
                    <span className='box-value'>
                      {' '}
                      {localShift.kilometerstandEnd || '-'}
                    </span>
                  </label>
                </>
              </div>
              <label className='box-label'>
                Kilometerstand Total:
                <span className='box-value'>
                  {(
                    +localShift.kilometerstandEnd -
                    +localShift.kilometerstandStart
                  ).toFixed(2) || '-'}
                </span>
              </label>
            </div>

            <div className='calulatedBox'>
              <div className='box'>
                <>
                  <label className='box-label'>
                    F01 Start:
                    <span className='box-value'>
                      {localShift.f01Start || '-'}
                    </span>
                  </label>
                  <div></div>
                </>
              </div>
              <div className='box'>
                <>
                  <label className='box-label'>
                    F01 End:{' '}
                    <span className='box-value'>
                      {' '}
                      {localShift.f01End || '-'}
                    </span>
                  </label>
                </>
              </div>
              <label className='box-label'>
                F01 Total:
                <span className='box-value'>
                  {(+localShift.f01End - +localShift.f01Start).toFixed(2) ||
                    '-'}
                </span>
              </label>
            </div>

            <div className='calulatedBox'>
              <div className='box'>
                <>
                  <label className='box-label'>
                    F02 Start:
                    <span className='box-value'>
                      {localShift.f02Start || '-'}
                    </span>
                  </label>
                  <div></div>
                </>
              </div>
              <div className='box'>
                <>
                  <label className='box-label'>
                    F02 End:{' '}
                    <span className='box-value'>
                      {' '}
                      {localShift.f02End || '-'}
                    </span>
                  </label>
                </>
              </div>
              <label className='box-label'>
                F02 Total:
                <span className='box-value'>
                  {(+localShift.f02End - +localShift.f02Start).toFixed(2) ||
                    '-'}
                </span>
              </label>
            </div>

            <div className='calulatedBox'>
              <div className='box'>
                <>
                  <label className='box-label'>
                    F03 Start:
                    <span className='box-value'>
                      {localShift.f03Start || '-'}
                    </span>
                  </label>
                  <div></div>
                </>
              </div>
              <div className='box'>
                <>
                  <label className='box-label'>
                    F03 End:{' '}
                    <span className='box-value'>
                      {' '}
                      {localShift.f03End || '-'}
                    </span>
                  </label>
                </>
              </div>
              <label className='box-label'>
                F03 Total:
                <span className='box-value'>
                  {(+localShift.f03End - +localShift.f03Start).toFixed(2) ||
                    '-'}
                </span>
              </label>
            </div>

            <div className='calulatedBox'>
              <div className='box'>
                <>
                  <label className='box-label'>
                    F12 Start:
                    <span className='box-value'>
                      {localShift.f12Start || '-'}
                    </span>
                  </label>
                  <div></div>
                </>
              </div>
              <div className='box'>
                <>
                  <label className='box-label'>
                    F12 End:{' '}
                    <span className='box-value'>
                      {' '}
                      {localShift.f12End || '-'}
                    </span>
                  </label>
                </>
              </div>
              <label className='box-label'>
                F12 Total:
                <span className='box-value'>
                  {(+localShift.f12End - +localShift.f12Start).toFixed(2) ||
                    '-'}
                </span>
              </label>
            </div>

            <div className='calulatedBox'>
              <div className='box'>
                <>
                  <label className='box-label'>
                    A12 Start:
                    <span className='box-value'>
                      {localShift.a12Start || '-'}
                    </span>
                  </label>
                  <div></div>
                </>
              </div>
              <div className='box'>
                <>
                  <label className='box-label'>
                    A12 End:{' '}
                    <span className='box-value'>
                      {localShift.a12End || '-'}
                    </span>
                  </label>
                </>
              </div>
              <label className='box-label'>
                A12 Total:
                <span className='box-value'>
                  {(+localShift.a12End - +localShift.a12Start).toFixed(2) ||
                    '-'}
                </span>
              </label>
            </div>
          </div>
        ) : null}

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
    </>
  );
}
