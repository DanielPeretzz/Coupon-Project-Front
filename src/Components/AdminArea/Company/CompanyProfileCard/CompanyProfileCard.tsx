import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../../Models/UserModel";
import "../../Customer/CustomerProfileCard/CustomerProfileCard.css";

import copmanyLogo from "../../../../Assets/Images/company-icons.png"
import adminSerivce from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationServ";

interface CompanyProfileCardProps {
    company: CompanyModel;
  }
  
  function CompanyProfileCard(props: CompanyProfileCardProps): JSX.Element {
  
    const navigate = useNavigate();
    
    async function deleteCompany() {
      try {
          const ok = window.confirm("Are you sure?")
          if (!ok) return;
          await adminSerivce.deleteCompany(props.company.id);
          notificationService.succses("Company has been deleted!")
          navigate("/all-companys")
      }
      catch (err: any) {
          notificationService.error(err)
      }
  
  }
  
  function navtoUpadteCompany() {
    navigate("update-company/" + props.company.id)
  }

  function navToCoupon(){
    navigate("company-coupons-admin/" + props.company.id)
  }


    return (
      <figure className="snip0045 red" >
        <div className="id-customer">
          <h2>ID: {props.company.id}</h2>
        </div>
        <figcaption className="details-card">
          <div className="name-title">
          <h2>{props.company.name} </h2>
          </div>
          <div className="profile-details">
            <p>{props.company.email}</p>
          </div>
          <div className="buttons-card">
            <button onClick={navtoUpadteCompany} className="fill" >Update</button>
            <button className="close" onClick={deleteCompany}>Delete</button>
          </div>
        </figcaption>
        <img className="img-pro-com" onClick={navToCoupon} src={copmanyLogo} alt="sample7" />
        <div className="position">{props.company.role}</div>
      </figure>
  
    );
  }
  
  export default CompanyProfileCard;