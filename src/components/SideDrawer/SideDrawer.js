import React from "react";
import "./SideDrawer.css";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";
import Home from "../../containers/Home";
import AboutUs from "../../containers/AboutUs";
import OurServices from "../../containers/OurServices";
import Projects from "../../containers/Projects";
import ContactUs from "../../containers/ContactUs";
import AddLand from "../../containers/AddLand";
import Fund from "../../containers/Fund";
import SignIn from "../../containers/SignIn";
import "../ToolBar/ToolBar.css";
import UserContext from "../../context/UserContext";

const SideDrawer = (props) => {
  let drawerClass = "side_drawer ";
  if (props.show === true) {
    drawerClass = "side_drawer open";
  }
  return (
    <>
      <header className="toolbar">
        <nav className="toolbar_nav">
          <div className="toolbar_logo">
            <a href="/">The Logo</a>
          </div>
          <div className="spacer_div"></div>
          <div className="toolbar_nav_Items"></div>
        </nav>
      </header>
      <Router>
        <nav className={drawerClass}>
          <div>
            <ul onClick={props.onClick}>
              {props.greet && (
                <button className="profileDrawer">
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
              <li>
                <NavLink activeStyle={{ color: "#13aa45" }} exact to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink activeStyle={{ color: "#13aa45" }} exact to="/AboutUs">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeStyle={{ color: "#13aa45" }}
                  exact
                  to="/OurServices"
                >
                  Our Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeStyle={{ color: "#13aa45" }}
                  exact
                  to="/Projects"
                >
                  Projects
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeStyle={{ color: "#13aa45" }}
                  exact
                  to="/ContactUs"
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
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
              <Route path="/SignIn" component={SignIn} />
              <Route path="/AddLand" component={AddLand} />
              <Route path="/Fund" component={Fund} />
            </Switch>
          </UserContext.Provider>
        </div>
      </Router>
    </>
  );
};
export default SideDrawer;
