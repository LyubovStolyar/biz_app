import { NavLink } from "react-router-dom";
import Header from "./Header";
import Title from "./Title";
import "./About.css";

function About() {
  return (
    <>
      <Header />
      <Title>
        <h1>About this app</h1>
        <h2>What makes BizAd the #1 app for advertizing businesses</h2>
      </Title>

    <div className="aboutApp">

        <p className="textAbout">
          Every day many businesses owners choose to use our app to advertise
          their businesses.
        </p>
        <button className="buttonService">
          <NavLink to="/home" className="navService">Start today</NavLink>
        </button>
    </div>

    </>
  );
}

export default About;
