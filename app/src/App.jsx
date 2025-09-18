import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      
      {/* Routing Components */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </>
  );
}

export default App;
