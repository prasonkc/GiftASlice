import React, { useState } from "react";

const SignUp = ({setLoggedIn, setUser}) => {
  // Variable value states
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const [passwordMatch, setPasswordMatch] = useState(true);

  function handleClick(e) {
    e.preventDefault();
    if (password != confirmedPassword) {
      setPasswordMatch(false);
      console.log("Password doesnt match");
      return;
    }

    setPasswordMatch(true);
    fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      // Send data to server
      body: JSON.stringify({
        name: name,
        dob: dob,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        // Set the login status and user after getting data from server
        if(data.userId){
          setLoggedIn(true)
          setUser(userId)
        }
      })
      .catch((e) => console.log(e));
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
      <form className="bg-[#1E293B] p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-[#E2E8F0] text-center">
          Sign Up
        </h2>

        {/* Name Input */}
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Full Name"
          className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:border-[#38BDF8] bg-[#0F172A] text-[#E2E8F0] placeholder-gray-400"
          onChange={(e) => setName(e.target.value)}
        />

        {/* Date of Birth Input */}
        <input
          type="date"
          name="dob"
          id="dob"
          placeholder="Date of Birth"
          className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:border-[#38BDF8] bg-[#0F172A] text-[#E2E8F0] placeholder-gray-400"
          onChange={(e) => {
            setDob(e.target.value);
          }}
        />

        {/* Email Input */}
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:border-[#38BDF8] bg-[#0F172A] text-[#E2E8F0] placeholder-gray-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:border-[#38BDF8] bg-[#0F172A] text-[#E2E8F0] placeholder-gray-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Confirm Password Input */}
        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
          placeholder="Confirm Password"
          className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:border-[#38BDF8] bg-[#0F172A] text-[#E2E8F0] placeholder-gray-400"
          onChange={(e) => {
            setConfirmedPassword(e.target.value);
          }}
        />

        {/* Confirm Password Tooltip */}
        {!passwordMatch && (
          <div className="bg-red-600 text-white text-sm px-3 py-1 rounded shadow-lg pointer-events-none text-center">
            Passwords don’t match
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#0F172A] font-semibold rounded-lg shadow-md transition-colors hover: cursor-pointer"
          onClick={handleClick}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
