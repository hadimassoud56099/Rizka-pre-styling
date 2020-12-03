import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormsControl from "../../FormInput/FormsControl";
import "../../CSS/Buttons.css";
import "../../CSS/Form.css";
import "./MyAccount.css";
import UserContext from "../../../context/UserContext";
import { useHistory } from "react-router-dom";
const MyAccount = (props) => {
  let history = useHistory();
  const [enable, setEnable] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const handleEdit = () => {
    setEnable(false);
  };

  const initialValues = {
    name: "",
    email: "",
  };
  const userValues = {
    name: props.User.name,
    email: props.User.email,
  };
  const handleAddAccount = () => {
    history.push("/SignIn");
  };
  useEffect(() => {
    setCurrentUser(userValues);
  }, []);
  const validationSchema = Yup.object({
    name: Yup.string().required(" Full Name is required"),
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Email is required"),
  });

  const onSubmit = () => {};
  return (
    <Formik
      initialValues={userValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <div className="header">My Account</div>
            <div>
              <FormsControl
                control="input"
                type="text"
                label=" Full Name"
                name="name"
                placeholder="Full Name"
                disabled={enable}
              />
              <FormsControl
                control="input"
                type="email"
                label="Email"
                name="email"
                placeholder="Email"
                disabled={enable}
              />
            </div>
            <div className="btn-div">
              <button
                type="button"
                className="myAccount-btns"
                onClick={handleAddAccount}
              >
                Switch Account
              </button>
            </div>
            {/* <div className="danger-error">{ backEndErr && backEndErr }</div>  */}
          </Form>
        );
      }}
    </Formik>
  );
};
export default MyAccount;
