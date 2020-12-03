import React, { useState, useEffect } from "react";
import "../../CSS/Fund.css";
import "../../CSS/Form.css";
import "../../CSS/Buttons.css";
import "../../Payments/Payments.css";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormsControl from "../../FormInput/FormsControl";
import axios from "axios";
import Cards from "react-credit-cards";

import "react-credit-cards/es/styles-compiled.css";

const MyPayments = (props) => {
  const [pymnt, setpymnt] = useState();
  let paymentArray = [];
  const fetchPayments = async () => {
    try {
      let fetch_Payment = await axios.get(
        "http://localhost:4000/usersPayment/getPayment",
        {
          headers: { "jwt-token": props.header },
        }
      );
      console.log("PaymentInfo", fetch_Payment);
      for (let i = 0; i < fetch_Payment.data.length; i++) {
        paymentArray.push(
          <tr className="tr">
            <td>{fetch_Payment.data[i].paymentAmount} $</td>
            <td>{fetch_Payment.data[i].date}</td>
          </tr>
        );
        console.log(paymentArray);
      }
      setpymnt(paymentArray);
    } catch (err) {}
  };
  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div>
      <div className="header"> Recent Payments</div>

      <table className="Table">
        <tbody>
          <tr className="tr">
            <th>Payment</th>
            <th>Date</th>
          </tr>
          {pymnt}
        </tbody>
      </table>
    </div>
  );
};

export default MyPayments;
