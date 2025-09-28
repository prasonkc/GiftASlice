import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Routes, Route, data } from "react-router-dom";
import Donate from "./components/Donate";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  // retrieve the session status
  useEffect(() => {
    fetch("http://localhost:4000/session", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.userId){
          setUserId(null)
          setLoggedIn(data.loggedIn)
          setUser(data.userName)
        }
      })
      .catch(() => setLoggedIn(false));
  }, []);
    
    return (
    <>
      <Navbar user={user} loggedIn={loggedIn}/>
      
      {/* Routing Components */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUser={setUser}/>} />
        <Route path="/signup" element={<SignUp setLoggedIn={setLoggedIn} setUser={setUser}/>} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
    </>
  );
}

export default App;
