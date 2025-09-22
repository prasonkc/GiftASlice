import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleClick(e) {
    e.preventDefault();
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
      <form className="bg-[#1E293B] p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-[#E2E8F0] text-center">Login</h2>

        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:border-[#38BDF8] bg-[#0F172A] text-[#E2E8F0] placeholder-gray-400"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:border-[#38BDF8] bg-[#0F172A] text-[#E2E8F0] placeholder-gray-400"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button
          type="submit"
          className="w-full py-3 bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#0F172A] font-semibold rounded-lg shadow-md transition-colors hover:cursor-pointer"
          onClick={handleClick}
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
