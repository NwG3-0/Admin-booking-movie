import logo from './logo.svg';
import React, { useEffect, useState, version } from 'react';
import './App.css';
import AppRouter from './router';
import { Button, DatePicker, Layout } from 'antd';
import './Layout/PrivateLayout'
import Home from './components/Home/Home';
import axios from 'axios';
import Cookies from "cookies-js";
function App() {
  const [token] = useState(Cookies?.get("token"));
  useEffect(()=>{
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    console.log(token);
  },[token])
  

  return (
    <AppRouter/>

  );
}

export default App;
