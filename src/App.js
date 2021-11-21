import React from 'react';
import { Routes, Route } from "react-router-dom"
import { useSelector } from 'react-redux';
import { selectAuthStatus, Login } from "./features/index"
import './App.css';

function App() {

  const status = useSelector(selectAuthStatus)

  return (
    <div className="bg-coolGray">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
