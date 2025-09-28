//-------------------------import starts 
import React, { useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
//--------------------this is still import till here------------------------------------//

// Create a promise for stripe checkout

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51SCKUTIvJKEzgucGbD0QWuvfwCjx1qA0bmbHe0apw4mwDBRqP1wDRvsNVJFAoKif08PxHVXRdxScjyjp1ZpjATjw00SYOru3bk"
);

const CheckoutForm = () => {
  // Create an instance of Stripe
  const stripe = useStripe();

  // Create an instance of elements to access mounted elements
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [amount, setAmount] = useState(1000);


  // const options = {
  //   mode: "payment",
  //   amount: 1000,
  //   currency: "usd",
  // };

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
    body: JSON.stringify({ amount: amount }), // $10
  });


    // Wait for processing and get the clientsecret from backend
    const { clientSecret } = await res.json();

    // Confirm the payment
    const cardElement = elements.getElement(CardElement);

  const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: { card: cardElement }
  });

    // Handle Errors
    if (error) {
      setMessage(error.message);
    } else if (paymentIntent.status === "succeeded") {
      setMessage("🎉 Payment successful!");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handlePayment}
      className="bg-[#1E293B] p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-6"
    >
      <h2 className="text-2xl font-bold text-[#E2E8F0] text-center">
        Donate Now
      </h2>

      {/* Custom Amount Input */}
    <input
      type="number"
      min="1"
      value={amount / 100} // display in dollars
      onChange={(e) => setAmount(Math.round(e.target.value * 100))} // store in cents
      placeholder="Enter donation amount ($)"
      className="p-4 border border-gray-600 rounded-lg bg-[#0F172A] text-[#E2E8F0]"
    />

      {/* Stripe Card Input */}{" "}
      <CardElement className="p-4 border border-gray-600 rounded-lg bg-[#0F172A]"
        options={{
          style: {
            base: {
              color: "#E2E8F0",
              "::placeholder": {
                color: "#FFFFFF",
              },
              fontSize: "16px",
            },
            invalid: {
              color: "#F87171",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full py-3 bg-[#38BDF8] hover:bg-[#0EA5E9] font-semibold rounded-lg shadow-md transition-colors cursor-pointer"
      >
        {" "}
        {loading ? "Processing..." : "Donate Now"}{" "}
      </button>{" "}
      {message && <p className="text-center text-white">{message}</p>}{" "}
    </form>
  );
};

const Donate = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
    {" "}
    <Elements stripe={stripePromise}>
      {" "}
      <CheckoutForm />{" "}
    </Elements>{" "}
  </div>
);
export default Donate;
