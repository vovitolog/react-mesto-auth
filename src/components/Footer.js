import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">{new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
