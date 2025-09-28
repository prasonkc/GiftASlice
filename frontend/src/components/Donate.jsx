import React from "react";
import ReactDOM from "react-dom";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Create a promise for stripe checkout

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51SCKUTIvJKEzgucGbD0QWuvfwCjx1qA0bmbHe0apw4mwDBRqP1wDRvsNVJFAoKif08PxHVXRdxScjyjp1ZpjATjw00SYOru3bk"
);

const Donate = () => {
  // Create an instance of Stripe
  const stripe = useStripe();

  // Create an instance of elements to access mounted elements
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const options = {
    mode: "payment",
    amount: 1000,
    currency: "usd",
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    // Create Backend to create payment Intent
    const res = await fetch("http://localhost:4000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 1000 }),
    });

    // Wait for processing
    const { clientSecret } = await res.json();

    // Confirm the payment
    const cardElement = elements.getElement(CardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      { payment_method: { card: cardElement } }
    );

    // Handle Errors
    if (error) {
      setMessage(error.message);
    } else if (paymentIntent.status === "succeeded") {
      setMessage("🎉 Payment successful!");
    }
    setLoading(false);
  };
  
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

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#0F172A] font-semibold rounded-lg shadow-md transition-colors hover:cursor-pointer"
            onClick={handlePayment}
          >
            Donate Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donate;
