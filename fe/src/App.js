import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./shared/Layout";
import Produk from "./components/pages/produk/Produk";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/dashboard"element={<Dashboard/>}/>
           
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
