import React from "react";
import "./DrawerToggleButton.css";

const DrawerToggleButton = (props) => {
  return (
    <div className="menu">
      <button className="toggle_button" onClick={props.handleClick}>
        <div className="toggle_button_line" />
        <div className="toggle_button_line" />
        <div className="toggle_button_line" />
      </button>
    </div>
  );
};

export default DrawerToggleButton;
