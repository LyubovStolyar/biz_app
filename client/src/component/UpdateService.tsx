import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { updateService } from "../services/apiService";
import { IService, serviceNames, statuses } from "./AddServices";
import Header from "./Header";
import Title from "./Title";

function UpdateService() {
  let location = useLocation();
  let navigate = useNavigate();
  const [state, setState] = useState({service: location.state as IService, disabled: true});  

  const updateButtonHandler = () => {
    const res = updateService(state.service);
    if (res) {
      res.then((res) => {
        if (res.status == 200) {
          navigate("../services");
        } else {
          console.log("Error updating service");
        }
      });
    } else {
      navigate("../login");
    }
  };

console.log("*");

  return (
    <>
      <Header></Header>
      <Title>
        <h1>Update Service</h1>
        <h2>Mailing list</h2>
      </Title>
      <span>{serviceNames[state.service.serviceName][1]}</span>
      <select value={state.service.status}
              onChange={(e) => setState({
              service: {  
                     status: Number.parseInt(e.target.value),
                     serviceName: state.service.serviceName,
                     msg: state.service.msg,
                     _id: state.service._id
                   },
             disabled: false })}>

        {statuses.map((s) => (
          <option value={s[0]} key={s[0]}>
            {s[1]}
          </option>
        ))}
      </select>
      <p></p>
      <textarea onChange={(e) => {
            if(state.disabled){
                   setState({
                       service: {  
                          status: state.service.status,
                          serviceName: state.service.serviceName,
                          msg: e.target.value,
                         _id: state.service._id
                         },
                   disabled: false })}}}
                onBlur={(e) => 
                    setState({
                       service: {  
                          status: state.service.status,
                          serviceName: state.service.serviceName,
                          msg: e.target.value,
                          _id: state.service._id
                          },
                     disabled: false })}>

        {/* {service.msg} */}
      </textarea>
      <button type="submit" onClick={updateButtonHandler} disabled={state.disabled}>Update Service</button>
      <NavLink to="/services">Delete</NavLink>
    </>
  );
}

export default UpdateService;
