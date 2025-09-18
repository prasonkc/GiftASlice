import React from "react";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
      <form className="bg-[#1E293B] p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-[#E2E8F0] text-center">Sign Up</h2>

        {/* Name Input */}
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Full Name"
          className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:border-[#38BDF8] bg-[#0F172A] text-[#E2E8F0] placeholder-gray-400"
        />

        {/* Date of Birth Input */}
        <input
          type="date"
          name="dob"
          id="dob"
          placeholder="Date of Birth"
          className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:border-[#38BDF8] bg-[#0F172A] text-[#E2E8F0] placeholder-gray-400"
        />

        {/* Email Input */}
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:border-[#38BDF8] bg-[#0F172A] text-[#E2E8F0] placeholder-gray-400"
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:border-[#38BDF8] bg-[#0F172A] text-[#E2E8F0] placeholder-gray-400"
        />

        {/* Confirm Password Input */}
        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
          placeholder="Confirm Password"
          className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:border-[#38BDF8] bg-[#0F172A] text-[#E2E8F0] placeholder-gray-400"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#0F172A] font-semibold rounded-lg shadow-md transition-colors"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default SignUp;
