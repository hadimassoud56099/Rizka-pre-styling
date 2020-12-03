import React from "react";
import "./Footer.css";
import { MdPlace, MdMail, MdLocalPhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="footer">
      <nav className="footer_nav">
        <div className="footer_nav_Items">
          <ul>
            <li>
              <MdPlace /> Beirut Lebanon
            </li>
            <li>
              <MdLocalPhone /> 70123456
            </li>
            <li>
              <MdMail /> Rizka@mail.com
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
