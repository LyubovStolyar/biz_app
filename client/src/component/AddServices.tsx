
import { string } from "joi";
import React from "react";
import { getServicesApi, addServiceApi, deleteServiceApi } from "../services/apiService";
import Header from "./Header";
import Table from "./Table";

// export type StatusType = "active" | "disabled";

export interface IService {
  serviceName: ServiceNames;
  status: Status;
  _id?: string;
}

export enum ServiceNames{
  "Playground",
  "Pet Store",
  "Sport Land"
}

export enum Status {
  "Active",
  "Disable"
}

interface ServiceState {
  services: Array<IService>;
 // serviceNames: Array<string>;
}

class AddServises extends React.Component <{}, ServiceState> {
  constructor(props: IService) {
    super(props);

    this.state = {
      services: [],
    };

    this.serviceNames = Object.entries(ServiceNames);
    this.serviceNames.length = this.serviceNames.length / 2;
      
    this.statuses = Object.entries(Status);
    this.statuses.length = this.statuses.length / 2;

  }

  serviceNames;
  statuses;
  newService : IService = {serviceName: 0, status: 0};

  componentDidMount() {
   let res = getServicesApi();
   if ( res ){
    res.then((res) => res.json())
    .then((json) => {
      this.setState(() => ({
        services: json,
      }));
    }); 
   }
      
  }

  addService(service: IService){
    let res = addServiceApi(service);
    if (res){
      res.then((res) => res.json())
      .then((json) => {
        this.setState(() => ({
          services: [...this.state.services, json]
        }))
    });
    }
  }

  deleteService = (id: string) => {
    let res = deleteServiceApi(id);
    if (res){
        res.then((res) => res.json())
           .then((json) => {
              const updated = this.state.services.filter(
              (service) => service._id !== json._id
              );
  
              this.setState(() => ({
              services: updated
             }));
            });
          }
      };

      

  render() {

    return (
      <>
        <Header />

       
        {/* <form action=""> */}
          <span>Service Name:</span>
          <select onChange={(e) => this.newService.serviceName = Number.parseInt(e.target.value)}>
           { this.serviceNames.map((s)=>
            <option value={s[0]} key={s[0]}>{s[1]}</option>)}
        
          </select>

          <span>Status:</span>
          <select onChange = {(e) => this.newService.status = Number.parseInt(e.target.value)}>
          { this.statuses.map((s)=>
            <option value={s[0]} key={s[0]}>{s[1]}</option>)}
          </select>

          <button onClick={() => this.addService(this.newService)}>Add service</button>

        {/* </form> */}

     <Table services={this.state.services} deleteService={this.deleteService}/>
       
        {
          //   (this.state.services.length === 0) &&
          //   <Message type="warning" children="No users to display." />
        }
      </>
    );
  }
}

export default AddServises;
