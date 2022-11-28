import { wait } from "@testing-library/user-event/dist/utils";
import { useEffect, useState } from "react";
import { CustomerModel } from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import { customersStore } from "../../../Redux/CustomersState";
import customerSerivce from "../../../Services/CustomerService";
import customerImage from "../../../Assets/Images/person2.jpg"

import "./CustomerProfile.css";




function CustomerProfile(): JSX.Element {
    const [customer, setCustomer] = useState<CustomerModel>();
 
    useEffect(() => {
             customerSerivce.getCustomer(authStore.getState().user.id)
            .then(res =>{
                setCustomer(customersStore.getState().customer)
            })
            .catch(err => console.log(err))
           
    }, []);

    

    return (
        
        <div>
            {customer &&
        <div className="card-profile">
            
        <div className="ds-top">
            <h2>&nbsp;CustomerID : {customer.id}</h2>
        </div>
            
        <div className="avatar-holder">
            
          <img src={customerImage} alt="Albert Einstein"/>
        </div>
        <div className="name">
          <h3>First name : {customer.firstName}</h3>
          <h3>Last name : {customer.lastName}</h3>
          
        </div>
        <div className="button">
            <br />
          <a href="#" className="btn" >Email : {customer.email + " "}<i className="fas fa-user-plus"></i></a>
        </div>

        <div className="ds-skill">
                <h6>Role : {customer.role}</h6>
        </div>
      </div>
            }
        </div>
    );
}

export default CustomerProfile;