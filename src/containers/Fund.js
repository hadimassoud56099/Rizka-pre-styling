import React, { useState, useEffect, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormsControl from "../components/FormInput/FormsControl";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

export default function Fund() {
  let history = useHistory();
  const { User } = useContext(UserContext);
  const initialValues = {
    amount: "",
    name: "",
    email: "",
  };

  const validationSchema = Yup.object({
    amount: Yup.number().required("Field required"),
    name: Yup.string().required("Field required"),
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Email is required"),
  });

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("http://localhost:4000/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: amount }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((err) => {});
  }, [amount]);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  let currentDate;
  const getCurrentTime = () => {
    //Get Current Time
    var today = new Date();
    currentDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      "  " +
      today.getHours() +
      ":" +
      today.getMinutes();

    //Date Got
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleClick = () => {
    history.push("/Projects");
  };

  const handleSubmit = async (ev, values) => {
    ev.preventDefault();
    setProcessing(true);
    getCurrentTime();
    console.log(currentDate);

    let paymentInfo = {
      userID: User.userData.id,
      userName: User.userData.name,
      amount: amount,
      date: currentDate,
    };
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      const savePayment = await axios.post(
        "http://localhost:4000/usersPayment/postPayment",
        paymentInfo
      );
      console.log(savePayment);

      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <div className="root-container">
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        {(formik) => {
          const { values } = formik;
          return (
            <Form id="payment-form" onSubmit={handleSubmit}>
              <div className="header">Payment Form</div>

              <FormsControl
                id="Donation-Amount"
                className="payment-input"
                control="input"
                type="number"
                label="Amount"
                name="amount"
                placeholder="Amount in US Dollars"
                className="user-info-input"
                value={amount}
                onBlur={(e) => setAmount(e.target.value)}
              />
              <label className="Card-label">Card Info</label>
              <CardElement
                id="card-element"
                className="payment-input"
                options={cardStyle}
                onChange={handleChange}
              />
              <div className="btn-div">
                <button onClick={handleClick} className="payment-button">
                  Back
                </button>
                <button
                  className="payment-button"
                  disabled={processing || disabled || succeeded}
                  id="submit"
                >
                  <span id="button-text">
                    {processing ? (
                      <div className="spinner" id="spinner"></div>
                    ) : (
                      "Pay"
                    )}
                  </span>
                </button>
              </div>
              <div>
                {/* Show any error that happens when processing the payment */}
                {error && (
                  <div className="card-error" role="alert">
                    {error}
                  </div>
                )}
                {/* Show a success message upon completion */}
                <p
                  className={
                    succeeded ? "result-message" : "result-message hidden"
                  }
                >
                  Payment succeeded, see the result in your
                  <a href={`https://dashboard.stripe.com/test/payments`}>
                    {" "}
                    Stripe dashboard.
                  </a>{" "}
                  Refresh the page to pay again.
                </p>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
