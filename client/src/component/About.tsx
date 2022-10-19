import { NavLink } from "react-router-dom";
import Header from "./Header";
import Title from "./Title";

function About() {
    return ( 
    <>
<Header />
<Title>
    <h1>About this app</h1>
    <h2>What makes BizAd the #q app for advertizing businesses</h2>
</Title>

<div>
    {/* <p></p> */}
    <NavLink to="/home">Start today</NavLink>
</div>
    </>
    );
}

export default About;