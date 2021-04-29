import React from 'react';
import "../styles/Footer.css";
import FooterNav from "./FooterNav";
import Notification from "./Notifications";

const Footer = () => {
  return (
    <footer>
      <>
        <Notification />
        <div className="logo">Filba</div>
        <FooterNav />
        <div className="copyrights">&copy; All rights reserved copyright {(new Date()).getFullYear()}</div>
      </>
    </footer>
  );
}

export default Footer;