import React, { useState, useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";
import "../CSS/SignIn.css";
import "../CSS/Form.css";
import FormsControl from "../FormInput/FormsControl";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

import { toast } from "react-toastify";
toast.configure();
const SignInBox = (props) => {
  const { User, setUser } = useContext(UserContext);
  const history = useHistory();

  const [backEndErr, setBackEndErr] = useState("");
  const notify = () => {
    toast.success("Sign In Successfull !", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  let token = props.emailToken;
  const verifyToken = async () => {
    console.log("token", token);

    const verify = await axios.post(
      `http://localhost:4000/users/sendEmailToken/${token}`
    );
    console.log(verify.data.active);
  };

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const onSubmit = async (values) => {
    verifyToken();

    let info = {
      email: values.email,
      password: values.password,
      // accountType:values.accountType
    };
    try {
      const signInUser = await axios.post(
        "http://localhost:4000/users/login",
        info
      );
      setUser({
        userData: signInUser.data.user,
        userToken: signInUser.data.token,
      });

      setBackEndErr("");
      localStorage.setItem("jwt-token", signInUser.data.token);
      notify();
      setTimeout(() => {
        history.push("/Projects");
      }, 2000);
    } catch (err) {
      console.log(err.response.data.msg);
      setBackEndErr(err.response.data.msg);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form id="Register-form">
            <div className="header">Sign In</div>

            <FormsControl
              control="input"
              type="email"
              label="Email"
              name="email"
              placeholder="Email"
            />
            <FormsControl
              control="input"
              type="password"
              label="Password"
              name="password"
              placeholder="Password"
              autoComplete="new-paasword"
            />
            <button
              type="submit"
              disabled={!formik.isValid}
              className="button signin-btn"
            >
              Sign In
            </button>

            <div className="danger-error">{backEndErr && backEndErr}</div>
          </Form>
        );
      }}
    </Formik>
  );
};
export default SignInBox;
