import { Link, NavLink } from "react-router-dom";
import LogOut from "./auth/Logout";
import Title from "./Title";
import "./Header.css";

function Header() {
  return (
    <>
      <div className="headerStyle">
        <div className="headCont">
        <span> <Link to="/home" className="headLink">Home</Link></span>
        <span> <Link to="/services" className="headLink">Services</Link></span>
        <span> <NavLink to="/about" className="headLink">About</NavLink></span>
        </div>

        <div>
         <span> <Link to="/login" className="headLink">Log in</Link></span>
         <span className="headLink"><LogOut/></span> 
        </div>
      </div>
      <Title text="" />
    </>
  );
}

export default Header;
