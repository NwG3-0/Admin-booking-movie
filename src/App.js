import React, { useEffect, useState } from "react";
import "./App.css";
import AppRouter from "./router";
import "./Layout/PrivateLayout";
import axios from "axios";
import Cookies from "cookies-js";

function App() {
  const [token] = useState(Cookies?.get("token"));
  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    console.log(token);
  }, [token]);

  return <AppRouter />;
}

export default App;
