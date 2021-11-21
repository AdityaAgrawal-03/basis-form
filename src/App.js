import React from 'react';
import { Routes, Route } from "react-router-dom"
import { useSelector } from 'react-redux';
import { selectAuthStatus, Login, VerifyOTP } from "./features/index"
import './App.css';

function App() {

  const status = useSelector(selectAuthStatus)

  return (
    <div className="bg-coolGray min-h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verify" element={<VerifyOTP />} />
      </Routes>
    </div>
  );
}

export default App;
