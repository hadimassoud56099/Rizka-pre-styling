import React from "react";
import "./ToolBar.css";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import Home from "../../containers/Home";
import AboutUs from "../../containers/AboutUs";
import OurServices from "../../containers/OurServices";
import Projects from "../../containers/Projects";
import ContactUs from "../../containers/ContactUs";
import AddLand from "../../containers/AddLand";
import Fund from "../../containers/Fund";
import UserContext from "../../context/UserContext";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";
import SignIn from "../../containers/SignIn";
import MyProfile from "../../containers/MyProfile";
import MyLandDetails from "../ProfileComp/MyLand/MyLandDetails";
import Payments from "../Payments/Payments";

const ToolBar = (props) => {
  console.log(props.User);
  return (
    <Router>
      <header className="toolbar">
        <nav className="toolbar_nav">
          <div className="toolbar_logo">
            <NavLink to="/">
              {" "}
              <em>
                <strong>Rizka</strong>
              </em>
            </NavLink>
          </div>
          <div className="spacer_div"></div>
          <div className="toolbar_nav_Items">
            <ul>
              <li>
                <NavLink
                  activeStyle={{ color: "#13aa45" }}
                  className="item"
                  exact
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeStyle={{ color: "#13aa45" }}
                  className="item"
                  exact
                  to="/AboutUs"
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeStyle={{ color: "#13aa45" }}
                  className="item"
                  exact
                  to="/OurServices"
                >
                  Our Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeStyle={{ color: "#13aa45" }}
                  className="item"
                  exact
                  to="/Projects"
                >
                  Projects
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeStyle={{ color: "#13aa45" }}
                  className="item"
                  exact
                  to="/ContactUs"
                >
                  Contact Us
                </NavLink>
              </li>
              {props.greet && (
                <button className="profile">
                  <NavLink
                    activeStyle={{ color: "#13aa45" }}
                    className="item "
                    exact
                    to="/MyProfile"
                  >
                    {props.greet}
                  </NavLink>
                </button>
              )}
            </ul>
          </div>
          {props.action_btn}

          <div>
            <DrawerToggleButton handleClick={props.drawerClickHandler} />
          </div>
        </nav>
      </header>
      <div style={{ marginTop: "64px" }}>
        <UserContext.Provider
          value={{ User: props.User, setUser: props.setUser }}
        >
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/AboutUs" component={AboutUs} />
            <Route path="/OurServices" component={OurServices} />
            <Route path="/Projects" component={Projects} />
            <Route path="/ContactUs" component={ContactUs} />

            <Route path="/AddLand" component={AddLand} />
            <Route path="/Fund" component={Fund} />
            <Route path="/MyProfile" component={MyProfile} />
            <Route path="/MyLandDetails" component={MyLandDetails} />
            <Route path="/Payments" component={Payments} />

            <Route path="/SignIn/:token" component={SignIn} />
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
};
export default ToolBar;
