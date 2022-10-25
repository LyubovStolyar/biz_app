import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage, { displayMode } from "./component/Homepage";
import Login from "./component/auth/Login";
import Signup from "./component/auth/Signup";
import About from "./component/About";
import AddServices from "./component/AddServices";
import UpdateService from "./component/UpdateService";
import PrivateRoute from "./component/auth/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" 
            element={<PrivateRoute><Homepage defaultDisplay={displayMode.grid} /></PrivateRoute>}/>
        <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
        <Route path="/services" element={<PrivateRoute><AddServices /></PrivateRoute>} />
        <Route path="/update" element={<PrivateRoute><UpdateService /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
