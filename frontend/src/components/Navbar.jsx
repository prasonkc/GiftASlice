import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = ({ loggedIn, user }) => {
  const [userClick, setUserClick] = useState(false);
  const panelRef = useRef(null);

  function handleUserClick(event) {
    // Change the state if panel is clicked
        setUserClick(!userClick);
  }

  function handleLogout(){
    fetch("http://localhost:4000/logout", {
      method: "POST", 
      headers: {"Content-Type": "application/json"},
      credentials: "include",
    }).then(res => res.json())
    .then((data) => {
      if(data.success){window.location.href="/login"}
    }).catch((e) => {console.log(e)})
  }

  // Close the user panel if it is open
   useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setUserClick(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-[#0F172A] text-[#E2E8F0] px-6 py-4 flex items-center justify-between mx-7">
        <Link to="/">
          {/* Left Icon */}
          <div className="text-xl font-bold">Icon</div>
        </Link>

        {/*Search bar  */}
        <div className="flex items-center gap-6">
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#1E293B] text-[#E2E8F0] placeholder-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] rounded-2xl"
          />

          {!loggedIn && (
            <Link to="/login">
              {/* Login Button */}
              <button className="text-sm font-medium hover:text-[#38BDF8] transition cursor-pointer">
                Log In
              </button>
            </Link>
          )}

          {/* SignUp Button */}
          {!loggedIn && (
            <Link to="/signup">
              <button className="bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#0F172A] font-semibold px-5 py-2 rounded-lg shadow-md transition cursor-pointer">
                Sign Up
              </button>
            </Link>
          )}

          {/* User Panel */}
          {loggedIn && (
            <div 
            className="flex flex-col items-center justify-center gap-2 bg-[#1E293B] rounded-2xl shadow-xl cursor-pointer relative"
            ref={panelRef}>
              {/* Avatar */}
              <div
                className="w-12 h-12 rounded-full bg-[#38BDF8] flex items-center justify-center text-[#0F172A] font-bold text-lg hover:scale-105 transition-transform"
                onClick={handleUserClick}
              >
                {user?.charAt(0).toUpperCase()}
                {user?.charAt(1).toUpperCase()}
              </div>

              {/* Panel */}
              {userClick && (
                <div className="absolute top-14 flex flex-col bg-[#2d3852] rounded-xl shadow-lg w-36 text-center">
                  <ul className="flex flex-col text-[#E2E8F0] font-medium">
                    <li className="hover:bg-[#1E293B] py-3 rounded">{user}</li>
                    <li className="hover:bg-[#1E293B] py-3 rounded" onClick={handleLogout}>Logout</li>
                  </ul>
                </div>
              )}
            </div>
          )}

        </div>
      </nav>
    </>
  );
};

export default Navbar;
