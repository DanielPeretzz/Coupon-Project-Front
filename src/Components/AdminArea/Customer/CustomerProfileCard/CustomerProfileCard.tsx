
import { CustomerModel } from "../../../../Models/UserModel";
import customerImage from "../../../../Assets/Images/person2.jpg"
import "./CustomerProfileCard.css";
import notificationService from "../../../../Services/NotificationServ";
import { useNavigate } from "react-router-dom";
import adminSerivce from "../../../../Services/AdminService";


interface CustomerProfileCardProps {
  customer: CustomerModel;
}

function CustomerProfileCard(props: CustomerProfileCardProps): JSX.Element {

  const navigate = useNavigate();
  
  async function deleteCustomer() {
    try {
        const ok = window.confirm("Are you sure?")
        if (!ok) return;
        await adminSerivce.deleteCustomer(props.customer.id);
        notificationService.succses("Customer has been deleted!")
        navigate("/all-customers")
    }
    catch (err: any) {
        notificationService.error(err)
    }

}

function navtoUpadteCustomer() {
  navigate("update-customer/" + props.customer.id)
}

function navToCoupon(){
  navigate("customer-coupons-admin/" + props.customer.id)
}

  return (
    <figure className="snip0045 red">
      <div className="id-customer">
        <h2>ID: {props.customer.id}</h2>
      </div>
      <figcaption className="details-card">
        <div className="name-title">
        <h2>{props.customer.firstName} <span>{props.customer.lastName}</span></h2>
        </div>
        <div className="profile-details">
          <p>{props.customer.email}</p>
        </div>
        <div className="buttons-card">
          <button onClick={navtoUpadteCustomer} className="fill" >Update</button>
          <button className="close" onClick={deleteCustomer}>Delete</button>
        </div>
      </figcaption>
      <img className="img-pro-com" onClick={navToCoupon} src={customerImage} alt="sample7" />
      <div className="position">{props.customer.role}</div>
    </figure>

  );
}

export default CustomerProfileCard;