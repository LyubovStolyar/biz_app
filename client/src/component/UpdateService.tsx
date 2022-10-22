import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { updateService } from "../services/apiService";
import { IService, serviceNames, statuses } from "./AddServices";
import Header from "./Header";
import Title from "./Title";

function UpdateService() {
  let location = useLocation();
  let navigate = useNavigate();
  let service: IService = location.state;

  const updateButtonHandler = () => {
    const res = updateService(service);
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

  return (
    <>
      <Header></Header>
      <Title>
        <h1>Update Service</h1>
        <h2>Mailing list</h2>
      </Title>
      <span>{serviceNames[service.serviceName][1]}</span>
      <select
        onChange={(e) => (service.status = Number.parseInt(e.target.value))}
      >
        {statuses.map((s) => (
          <option value={s[0]} key={s[0]}>
            {s[1]}
          </option>
        ))}
      </select>
      <p></p>
      <textarea onChange={(e) => (service.msg = e.target.value)}>
        {service.msg}
      </textarea>
      <button onClick={updateButtonHandler}>Update Service</button>
      <NavLink to="/services">Delete</NavLink>
    </>
  );
}

export default UpdateService;
