import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import AddImage from "./Pages/Create";
import MainImage from "./components/Mainimage";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Create" element={<AddImage />} />
          <Route path="/imagesget/:id" element={<MainImage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
