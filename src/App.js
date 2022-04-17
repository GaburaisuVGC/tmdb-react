import React from "react";
import "./App.css";
import {Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Film from "./pages/Film";

export default function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<><Home /></>} />
          <Route path="/:id" element={<><Film /></>} />
        </Routes>
      </div> 
  );
}
