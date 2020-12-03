import React, { useState, useContext } from "react";
import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "../CSS/Signup.css";
import FormsControl from "../FormInput/FormsControl";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../components/CSS/Buttons.css";
import "../../components/CSS/Form.css";
toast.configure();

const SignUpBox = () => {
  const history = useHistory();
  const notify = () => {
    toast.success("Sign Up Successfull !", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const { User, setUser } = useContext(UserContext);

  const [backEndErr, setBackEndErr] = useState("");
  // const accountType=[
  //     {key:"Land Owner" , value:"LandOwner"},
  //     {key:"Project Funder" , value:"Funder"},
  // ]
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    // accountType:"",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required(" Full Name is required"),
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Please confirm password"),
    // accountType:Yup.string().required("Please choose your account type "),
  });
  let [buttonValue, setButtonValue] = useState("Sign Up");
  const handleClick = () => {
    setButtonValue(<div className="spinner" id="spinner"></div>);
    setTimeout(() => {
      setButtonValue("Sign up");
    }, 1000);
  };
  const onSubmit = async (values) => {
    try {
      let info = {
        name: values.name,
        email: values.email,
        password: values.password,
        passwordCheck: values.confirmPassword,
        // accountType:values.accountType
      };
      const signUpUser = await axios.post(
        "http://localhost:4000/users/register",
        info
      );

      console.log("User", signUpUser);

      setBackEndErr("");

      notify();
    } catch (err) {
      console.log(err.response.data.msg);
      setBackEndErr(err.response.data.msg); // err.response.status will give you the error code.
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
            <div className="header">Sign Up</div>

            <FormsControl
              control="input"
              type="text"
              label=" Full Name"
              name="name"
              placeholder="Full Name"
            />
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
            <FormsControl
              control="input"
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm Password"
              autoComplete="new-paasword"
            />
            {/* <FormsControl control='radio' label=" Account Type" name='accountType' options={accountType}/>  */}
            <button
              className=" button signin-btn"
              disabled={!formik.isValid}
              id="submit"
              onClick={handleClick}
            >
              <span id="button-text">
                <div> {buttonValue}</div>
              </span>
            </button>

            <div className="danger-error">{backEndErr && backEndErr}</div>
          </Form>
        );
      }}
    </Formik>
  );
};
export default SignUpBox;
