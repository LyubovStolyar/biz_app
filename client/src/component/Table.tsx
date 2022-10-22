import React from "react";
import { BiTrash } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { IService, ServiceNames, Status } from "./AddServices";

// export type StatusType = {
//     status: "active" | "disabled";
//     service: string;
// }

interface Props {
services: Array<IService>;
deleteService: Function
}

 export default function Table (props: Props) {
  if (props.services.length === 0) return <p> You haven't selected any services yet.</p>;
        return ( 

            <>
            <table>
                <thead>
              <tr>
            <th>Service</th>
            <th> Status</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
            {props.services.map((s) => (
              <tr key={s._id}>
                <td>
                    <NavLink to="/update" state={s}>{ServiceNames[s.serviceName]}</NavLink>
                </td>
                <td>{Status[s.status]}</td>
                <td>
                  <button
                    onClick={() => props.deleteService(s._id)}
                    className="">
                    <i className=""><BiTrash/></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
            </>
         );
            }