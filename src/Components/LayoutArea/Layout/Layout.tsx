import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { Router, useNavigate } from "react-router-dom";
import { adminStore, fetchCusromerAction } from "../../../Redux/AdminState";
import { authStore } from "../../../Redux/AuthState";
import { couponStore } from "../../../Redux/CouponsState";
import { customersStore, fetchCouponsAction } from "../../../Redux/CustomersState";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationServ";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import ContantUs from "../ContantUs/ContantUs";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

import Routing from "../Routing/Routing";
import "./Layout.css";


function Layout(): JSX.Element {

        const nav = useNavigate();

        useEffect(() => {
            setInterval(() => {
                if (authStore.getState().token) {
                    const { exp } = jwtDecode(authStore.getState().token) as {
                        exp: number
                    };

                    const expirationDatetimeInSeconds = exp;

                    if (expirationDatetimeInSeconds < Math.floor(Date.now() / 1000)) {
                        authService.logout();
                        localStorage.clear();
                        customersStore.dispatch(fetchCouponsAction([]));
                        adminStore.dispatch(fetchCusromerAction([]))
                        couponStore.getState().productsCart = [];
                        notificationService.error("Times up, Please re-login to continue!");
                        nav("/sign-in")
                    }
                }
            }, 12000000);

        }, []);
    
    return (
        <div className="Layout">
        <header>
            <div className="auth">
                <AuthMenu/>
            </div>
            <NavBar/>
        </header>
        <main>
            <Routing/>
        </main>
        <footer>
           <Footer/>
        </footer>
     </div>
    );
}

export default Layout;
