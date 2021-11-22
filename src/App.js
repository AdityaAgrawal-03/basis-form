import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login, VerifyOTP, Signup, Profile } from "./features/index";
import { PrivateRoute } from "./components/PrivateRoute";
import "./App.css";

function App() {
  return (
    <div className="bg-coolGray min-h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/verify"
          element={
            <PrivateRoute>
              <VerifyOTP />
            </PrivateRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PrivateRoute>
              <Signup />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
