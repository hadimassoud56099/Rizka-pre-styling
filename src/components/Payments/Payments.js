import React, { useContext, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Fund from "../../containers/Fund";
import "../CSS/Fund.css";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import { getActiveElement } from "formik";
import axios from "axios";

const promise = loadStripe(
  "pk_test_51HqQGGAlocIN8KSLGFGJzVNGPORWZMJJMakbHPG9tidokBUteUoMghlp2EhVKmT7fSxPjhr3wn6qpkXmS3IMeHNL00ON9jzRts"
);
const Payments = (props) => {
  const { User } = useContext(UserContext);

  let history = useHistory();
  let verify;

  useEffect(() => {
    let token = localStorage.getItem("jwt-token");
    console.log("UserToken", User.userToken);
    console.log("token", token);
    if (!User.userData && !token) {
      history.push("/SignIn");
    }
  }, []);

  return (
    <>
      <Elements stripe={promise}>
        {" "}
        <Fund />{" "}
      </Elements>
    </>
  );
};

export default Payments;
