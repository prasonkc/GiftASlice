import React from "react";

const Donate = () => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
        <form className="bg-[#1E293B] p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-[#E2E8F0] text-center">
            Donate Now
          </h2>

          {/* Card Number Input */}
          <input
            type="text"
            name="card-number"
            id="card-number"
            placeholder="Credit Card Number"
            className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:border-[#38BDF8] bg-[#0F172A] text-[#E2E8F0] placeholder-gray-400"
          />
          <div className="flex gap-10">
            {/*  Expiry date*/}
            <input
              type="text"
              name="card-expiry-date"
              id="card-expiry-date"
              placeholder="Expiry Date"
              className="w-2/3 px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:border-[#38BDF8] bg-[#0F172A] text-[#E2E8F0] placeholder-gray-400"
            />
            {/*  CVV */}
            <input
              type="text"
              name="card-cvv"
              id="card-cvv"
              placeholder="CVV"
              className="w-1/3 px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:border-[#38BDF8] bg-[#0F172A] text-[#E2E8F0] placeholder-gray-400"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Donate;
