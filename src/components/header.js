import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header(props) {
  const route = useLocation();

  let pathName = route.pathname;

  const navigate = useNavigate();
  return (
    <div className='header container'>
      <div
        style={{ color: pathName === '/' ? 'tomato' : 'grey' }}
        onClick={() => navigate('/', false)}
      >
        Shifts
      </div>
      <div
        style={{ color: pathName === '/rides' ? 'tomato' : 'grey' }}
        onClick={() => navigate('/rides', false)}
      >
        Rides
      </div>
    </div>
  );
}
