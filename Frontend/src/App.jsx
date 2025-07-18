import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import './App.css';

import Layout from './components/Layout';
import ActiveProvider from './context/ActiveContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Vehicle from './pages/Vehicle';
import Bookings from './pages/Bookings';
import GetVehicles from './pages/GetVehicles';

function App() {
  return (
    <>
      <ActiveProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/vehicle" replace />} />

            {/* Layout route wraps nested routes */}
            <Route path="/" element={<Layout />}>
              <Route path="vehicle" element={<Vehicle />} />
              <Route path="bookings/:id" element={<Bookings />} />
              <Route path="get-vehicles" element={<GetVehicles />} />
              {/* <Route path="signUp" element={<Signup />} /> */}
            </Route>
          </Routes>
        </Router>

        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              fontSize: '13px',
            },
          }}
        />
      </ActiveProvider>
    </>
  );
}

export default App;
