import { useEffect, useState } from "react";
import { CustomerModel } from "../../../../Models/UserModel";
import { adminStore } from "../../../../Redux/AdminState";
import adminSerivce from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationServ";

import CustomerProfileCard from "../CustomerProfileCard/CustomerProfileCard";


function CustomersProfile(): JSX.Element {
    const [customer, setCustomer] = useState<CustomerModel[]>([]);
    
    useEffect(() => {
        adminSerivce.getAllCustomers()
       .then(customer =>{
           setCustomer(customer)
       })
       .catch(err => notificationService.error(err))
      
}, []);


useEffect(() => {

    setCustomer(adminStore.getState().customers);
    

    const unsubscribe = adminStore.subscribe(() => {
        const duplicatedCustomer = [...adminStore.getState().customers]
        setCustomer(duplicatedCustomer);
    });

    return () => {
        unsubscribe();
    };

}, []);

    function x(){
        console.log(customer)
    }
    
    return (
        
        <div className="customer-profile">

            {customer &&
            customer.map(c => <CustomerProfileCard key={c.id} customer={c} />)}
        </div>
        
 
    );
}

export default CustomersProfile;