import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShiftRide from './screens/shift-rides';
import Rides from './screens/rides';

import Shift from './screens/shift';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Shift />} />
          <Route exact path='/shift/:shiftId' element={<ShiftRide />} />
          <Route exact path='/rides' element={<Rides />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
