import React from "react"
const currentYear = new Date().getFullYear();

const Footer = (props) => {
  return (
    <footer className="footer">
      <p className="footer__copyright" lang="en">&#169; {currentYear} Mesto Russia</p>
    </footer>
  )
};

export default Footer;
