import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ loggedIn, user }) => {
  return (
    <>
      <nav className="bg-[#0F172A] text-[#E2E8F0] px-6 py-4 flex items-center justify-between">
        <Link to="/">
          {/* Left Icon */}
          <div className="text-xl font-bold">Icon</div>
        </Link>

        {/*Right Panel  */}
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
        </div>
      </nav>
    </>
  );
};

export default Navbar;
