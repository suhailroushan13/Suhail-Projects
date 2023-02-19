import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import axios from "axios";

import './App.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Main from './components/Main';
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDash from "./components/AdminDash";
import UserDash from "./components/UserDash"
import PrivateRoute from "./utils/PrivateRoute";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login  />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//Note : in-line styling in React JSx must be sent as object)key-value pair

//State : Dynamic Data of React comp. is known as State