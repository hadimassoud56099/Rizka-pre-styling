import React, { useContext, useState } from "react";
import "../components/CSS/Projects.css";
import "../components/CSS/Buttons.css";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Payments from "../components/Payments/Payments";
import SignIn from "./SignIn";

const Projects = () => {
  const { User, setUser } = useContext(UserContext);
  let history = useHistory();
  // console.log(User.userData);
  const [pay, setPay] = useState();
  const handleAddLand = () => {
    if (User.userData) {
      history.push("/AddLand");
    } else history.push("/SignIn");
  };

  const handleFund = () => {
    if (User.userData) {
      history.push("/Payments");
    } else history.push("/SignIn");
  };

  return (
    <>
      <div className="sub_nav_div">
        <button className="  action-btn button" onClick={handleAddLand}>
          {" "}
          Add Land{" "}
        </button>
        <button className="  action-btn button " onClick={handleFund}>
          {" "}
          Fund{" "}
        </button>
      </div>
      {pay}
    </>
  );
};
export default Projects;
