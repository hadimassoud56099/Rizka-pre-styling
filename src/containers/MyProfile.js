import React, { useEffect, useContext, useState } from "react";
import MyAccount from "../components/ProfileComp/MyAccount/MyAccount";
import MyLand from "../components/ProfileComp/MyLand/MyLand";
import MyPayments from "../components/ProfileComp/MyPayments/MyPayments";
import { useHistory } from "react-router-dom";
import "../components/CSS/Form.css";
import "../components/CSS/MyProfile.css";
import UserContext from "../context/UserContext";
import axios from "axios";
const MyProfile = () => {
  let history = useHistory();
  const { User } = useContext(UserContext);

  let options = [
    {
      _id: 0,
      option: "",
    },
  ];
  let header = User.userToken;

  useEffect(() => {
    let token = localStorage.getItem("jwt-token");
    if (!User.userData && !token) {
      history.push("SignIn");
    }
    let LandInfo = async () => {
      let Info = await axios.get("http://localhost:4000/usersLand/getMyLands", {
        headers: { "jwt-token": User.userToken },
      });
      for (let i = 0; i < Info.data.length; i++) {
        options.push({
          _id: Info.data[i].LandValues.landName,
          option: Info.data[i].LandValues.landName,
        });
      }
      console.log("options", options);
    };
    LandInfo();
  }, [options]);
  const [page, setPage] = useState({
    myAccount: false,
    myLands: false,
    myPayments: false,
    currentPage: "",
  });

  const handleAccount = () => {
    setPage({
      myAccount: true,
      myLands: false,
      myPayments: false,
      currentPage: <MyAccount User={User.userData} />,
    });
  };
  const handleLands = () => {
    setPage({
      myAccount: false,
      myLands: true,
      myPayments: false,
      currentPage: <MyLand options={options} header={header} />,
    });
  };
  const handlePayments = () => {
    setPage({
      myAccount: false,
      myLands: false,
      myPayments: true,
      currentPage: <MyPayments User={User.userData} header={header} />,
    });
  };
  return (
    <>
      <div className="root-container">
        <div className="box-controller">
          <div
            className={
              "controller " + (page.myAccount && "selected-controller")
            }
            onClick={handleAccount}
          >
            Account
          </div>
          <div
            className={"controller " + (page.myLands && "selected-controller")}
            onClick={handleLands}
          >
            Lands
          </div>
          <div
            className={
              "controller " + (page.myPayments && "selected-controller")
            }
            onClick={handlePayments}
          >
            Payments
          </div>
        </div>

        {page.currentPage}
      </div>
    </>
  );
};
export default MyProfile;
