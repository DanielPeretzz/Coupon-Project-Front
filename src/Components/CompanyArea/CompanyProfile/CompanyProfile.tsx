import { useEffect, useState } from "react";
import { CompanyModel } from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import { companysStore } from "../../../Redux/CompanyState";
import companySerivce from "../../../Services/CompanyService";
import companyImage from "../../../Assets/Images/company-icons.png"
import "./CompanyProfile.css";

function CompanyProfile(): JSX.Element {
    const [company, setCompany] = useState<CompanyModel>();
 
    useEffect(() => {
             companySerivce.getCompany(authStore.getState().user.id)
            .then(res =>{
                setCompany(companysStore.getState().company)
            })
            .catch(err => console.log(err))
           
    }, []);

    

    return (
        
        <div >
            {company &&
        <div className="card-profile">
            
        <div className="ds-top">
            <h2>&nbsp;CustomerID : {company.id}</h2>
        </div>
            
        <div className="avatar-holder">
            
          <img src={companyImage} alt="Albert Einstein"/>
        </div>
        <div className="name">
          <h3>Company name : {company.name}</h3>
        </div>
        <div className="button">
            <br />
          <a href="#" className="btn" >Email : {company.email + " "}<i className="fas fa-user-plus"></i></a>
        </div>

        <div className="ds-skill">
                <h6>Role : {company.role}</h6>
        </div>
      </div>
            }
        </div>
    );
}

export default CompanyProfile;