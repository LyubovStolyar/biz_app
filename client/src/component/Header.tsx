import { BiStore } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import LogOut from "./auth/Logout";
import "./Header.css";


function Header() {
  return (
    <>
    <div className="headerStyle">
        <div className="headLeft">
          <i className="icon">< BiStore/></i>
          <Link to="/home" className="headLink">Home</Link>
          <Link to="/services" className="headLink">Services</Link>
          <NavLink to="/about" className="headLink">About</NavLink>
        </div>

        <div className="headRight">
         <Link to="/login" className="headLink">Log in</Link>
         <div className="headLink"><LogOut/> 
        </div>
    </div>
    </div>
    </>
  );
}

export default Header;
