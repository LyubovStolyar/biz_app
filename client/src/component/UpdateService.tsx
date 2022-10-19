
import { NavLink } from "react-router-dom";
import Header from "./Header";
import Title from "./Title";



function UpdateService() {
    return ( 

<>
<Header></Header>
<Title>
    <h1>Update Service</h1>
    <h2>Mailing list</h2>
</Title>

<select name="" ></select>
<p></p>
<textarea name="" id="" ></textarea>
<button  >Update Service</button>
<NavLink to="/services">Delete</NavLink>

</>

     );
}

export default UpdateService;