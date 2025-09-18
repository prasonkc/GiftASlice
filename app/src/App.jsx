import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      {/* Routing Components */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
