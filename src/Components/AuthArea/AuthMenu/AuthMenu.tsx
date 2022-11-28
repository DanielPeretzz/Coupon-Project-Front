import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Role from "../../../Models/Role";
import { BaseUserModel, CompanyModel, CustomerModel } from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<BaseUserModel>();

    useEffect(() => {

        setUser(authStore.getState().user);

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });

        return () => {
            unsubscribe();
        };

    }, []);


    function getDetails(): string {

        switch (user.role) {

            case Role.Customer:
                const customer = user as CustomerModel;
                return "Hello, " + customer.email;

            case Role.Company:
                const company = user as CompanyModel;
                return "Hello, " + company.email;
                
            default:
                return "Hello, " + "Admin";
        }
    }

   

    return (
        <div className="AuthMenu">

            {
                !user && <>
                    <h2 className="auth-title">Hello Guest |  Please Login </h2>
                </>
            }

            {
                user && <>
                    <h2 className="auth-title">{getDetails()}  </h2>

                </>
            }

        </div>
    );
}

export default AuthMenu;
