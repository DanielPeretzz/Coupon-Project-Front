import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminStore, fetchCusromerAction } from "../../../Redux/AdminState";
import { fetchComapnyAction } from "../../../Redux/CompanyState";
import { couponStore } from "../../../Redux/CouponsState";
import { customersStore, fetchCouponsAction } from "../../../Redux/CustomersState";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationServ";
import "./Logout.css";

function Logout(): JSX.Element {

    const navigate = useNavigate();


    useEffect(() => {
        
        authService.logout();
        localStorage.clear(); 
        notificationService.succses("Good Bye! see you soon.")
        navigate("/home");
        customersStore.dispatch(fetchCouponsAction([]));
        adminStore.dispatch(fetchCusromerAction([]))
        couponStore.getState().productsCart = [];

    }, []);

    return null;
}

export default Logout;