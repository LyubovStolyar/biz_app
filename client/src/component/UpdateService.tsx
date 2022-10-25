import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { updateService } from "../services/apiService";
import { IService, serviceNames, statuses } from "./AddServices";
import Header from "./Header";
import Title from "./Title";
import "./UpdateService.css";

function UpdateService() {
  let location = useLocation();
  let navigate = useNavigate();
  const [state, setState] = useState({
    service: location.state as IService,
    disabled: true,
  });

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

  return (
    <>
      <Header></Header>
      <Title>
        <h1>Update Service</h1>
        <h2>Mailing list</h2>
      </Title>

     

      <div className="serviceEditables">
      <div className="serviseName">
        {serviceNames[state.service.serviceName][1]}
      </div>
      <p>Status:</p>
        <select
     className="statusOptionEdit"
          value={state.service.status}
          onChange={(e) =>
            setState({
              service: Object.assign(state.service, {
                status: Number.parseInt(e.target.value),
              }),
              disabled: false,
            })
          }
        >
          {statuses.map((s) => (
            <option value={s[0]} key={s[0]}>
              {s[1]}
            </option>
          ))}
        </select>
<p>Comment:</p>
        <textarea
          onChange={() => {
            if (state.disabled)
              setState(Object.assign(state, { disabled: false }));
          }}
          onBlur={(e) =>
            setState({
              service: Object.assign(state.service, { msg: e.target.value }),
              disabled: false,
            })
          }
        ></textarea>
      </div>

      <div className="serviceButtonsHolder">
        <button className="updateButton"
          type="submit"
          onClick={updateButtonHandler}
          disabled={state.disabled}
        >
          Update Service
        </button>
        <button className="deleteButton">
          <NavLink className='updateNav' to="/services">Delete</NavLink>
        </button>
      </div>
    </>
  );
}

export default UpdateService;
