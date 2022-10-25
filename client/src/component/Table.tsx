import React from "react";
import { BiTrash } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { IService, ServiceNames, Status } from "./AddServices";
import './Table.css'

interface Props {
services: Array<IService>;
deleteService: Function
}

 export default function Table (props: Props) {
  if (props.services.length === 0) return <p> You haven't selected any services yet.</p>;
        return ( 

            <>
            <table className="servicesTable">
                <thead className="tableHead">
              <tr className="">
            <th>Service</th>
            <th> Status</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
            {props.services.map((s) => (
              <tr key={s._id}>
                <td>
                    <NavLink to="/update" className={'serviceNav'} state={s}>{ServiceNames[s.serviceName]}</NavLink>
                </td>
                <td className='serviceStatus' >{Status[s.status]}</td>
                <td>
                  <button className="serviceIconButton"
                    onClick={() => props.deleteService(s._id)}
                   >
                    <i className="serviceIcon"><BiTrash/></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
            </>
         );
            }