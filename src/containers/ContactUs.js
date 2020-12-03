import React, { useState, useContext } from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";
import FormsControl from "../components/FormInput/FormsControl";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/CSS/Buttons.css";
import "../components/CSS/Form.css";

const ContactUs = () => {
  const history = useHistory();

  const { User, setUser } = useContext(UserContext);
  console.log(User.userData);
  const [backEndErr, setBackEndErr] = useState("");

  const initialValues = {
    message: "",
  };

  const validationSchema = Yup.object({
    message: Yup.string().required("You didn't enter your message"),
  });

  let [buttonValue, setButtonValue] = useState("send Message");
  const handleClick = () => {
    setButtonValue(<div className="spinner" id="spinner"></div>);
    setTimeout(() => {
      setButtonValue("Send Message");
    }, 1000);
  };
  const onSubmit = async (values) => {
    try {
      let contactInfo = {
        name: User.userData.name,
        email: User.userData.email,
        message: values.message,
      };
      let sentEmail = await axios.post(
        "http://localhost:4000/users/ContactUs",
        contactInfo
      );
      console.log("ContactInfo", sentEmail);
      if (sentEmail) {
        toast.success("Message Sent");
      } else toast.error("Some Thing Weint Wrong");
    } catch (err) {
      setBackEndErr(err);
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
          <Form>
            <div className="root-container">
              <div className="header">Contact Us</div>

              <FormsControl
                control="textArea"
                type="text"
                label="Message"
                name="message"
                placeholder="Enter your Message Here"
              />

              {/* <FormsControl control='radio' label=" Account Type" name='accountType' options={accountType}/>  */}
              <button
                className="button"
                type="submit"
                disabled={!formik.isValid}
                id="submit"
                onClick={handleClick}
              >
                <span id="button-text">
                  <div> {buttonValue}</div>
                </span>
              </button>
              <div className="danger-error">{backEndErr && backEndErr}</div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ContactUs;
