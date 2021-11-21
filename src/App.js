import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectAuthStatus,
  Login,
  VerifyOTP,
  Signup,
  Profile,
} from "./features/index";
import "./App.css";

function App() {
  const status = useSelector(selectAuthStatus);

  return (
    <div className="bg-coolGray min-h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verify" element={<VerifyOTP />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
