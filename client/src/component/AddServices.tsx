

import React from "react";
import { getServicesApi, addServiceApi, deleteServiceApi } from "../services/apiService";
import Header from "./Header";
import Table from "./Table";
import Title from "./Title";

export interface IService {
  serviceName: ServiceNames;
  status: Status;
  msg?: string;
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

export const statuses =  Object.entries(Status);
statuses.length = statuses.length / 2;

export const serviceNames = Object.entries(ServiceNames);
serviceNames.length = serviceNames.length / 2;

interface ServiceState {
  services: Array<IService>;
}

class AddServises extends React.Component <{}, ServiceState> {
  constructor(props: IService) {
    super(props);

    this.state = {
      services: [],
    };

  }

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
   }else{
    window.open("/login",'_self');
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
    else{
      window.open("/login",'_self');
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
          }else{
            window.open("/login",'_self');
          }
      };

      

  render() {

    return (
      <>
        <Header />
<Title>
  <h1>Services</h1>
  <h2>Choose service that you would like to get</h2>
</Title>
       
        {/* <form action=""> */}
          <span>Service Name:</span>
          <select onChange={(e) => this.newService.serviceName = Number.parseInt(e.target.value)}>
           { serviceNames.map((s)=>
            <option value={s[0]} key={s[0]}>{s[1]}</option>)}
        
          </select>

          <span>Status:</span>
          <select onChange = {(e) => this.newService.status = Number.parseInt(e.target.value)}>
          { statuses.map((s)=>
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
