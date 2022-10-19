import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Homepage, { displayMode } from "./component/Homepage";
import Login from "./component/auth/Login";
import Signup from "./component/auth/Signup";
import About from "./component/About";
import AddServices from "./component/AddServices";
import UpdateService from "./component/UpdateService";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Homepage defaultDisplay={displayMode.grid}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<AddServices />} />
        <Route path="/update" element={<UpdateService />} />
     
      </Routes>
    </>
  );
}

export default App;
