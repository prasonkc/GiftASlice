import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Routes, Route, data } from "react-router-dom";
import Donate from "./components/Donate";
import { useEffect } from "react";

function App() {
  
  useEffect(() => {
    fetch("http://localhost:4000/")
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data));
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <Navbar />
      
      {/* Routing Components */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
    </>
  );
}

export default App;
