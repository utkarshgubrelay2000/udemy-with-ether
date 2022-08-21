import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY = "pk_test_51IlGNCSDvGZXZeespvkKQnIvpEdaHT8PwWMRRon3n8UjEU06jhTbHYZfgPuaMw674miyLiy6e5Tl8Zv1jLWIO7pj0013tY5U8b";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const ELEMENTS_OPTIONS = {
    fonts: [
      {
        cssSrc: "https://fonts.googleapis.com/css?family=Roboto"
      }
    ]
  };
  

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise} options={ELEMENTS_OPTIONS}>
      <PaymentForm />
    </Elements>
  );
}
