import axios from "axios";
import jwtDecode from "jwt-decode";
import { start } from "repl";
import { json } from "stream/consumers";
import CredentialsModel from "../Models/CredentialsModel";
import JwtWrapper from "../Models/Wrappers/JwtWrapper";
import UserModel, { BaseUserModel, CompanyModel, CustomerModel } from "../Models/UserModel";
import { authStore, loginAction, logoutAction, registerAction } from "../Redux/AuthState";

import appConfig from "../Utils/Config";
import { companysStore, fetchCouponsAction } from "../Redux/CompanyState";
import CustomerCoupon from "../Components/CustomerArea/CustomerCoupon/CustomerCoupon";
import { customersStore } from "../Redux/CustomersState";
import { addCompanyAction, adminStore } from "../Redux/AdminState";

class AuthService{

    public async registerCompany(user: CompanyModel): Promise<void>{
        const reponse =  await axios.post<JwtWrapper>(appConfig.registerCompany,user);
        const token  = reponse.data.jwt
        authStore.dispatch(registerAction(token));
        adminStore.dispatch(addCompanyAction(user));
    }

    
    public async registerCustomer(user: CustomerModel): Promise<void>{
        const reponse =  await axios.post<JwtWrapper>(appConfig.registerCustomer,user);
        const token  = reponse.data.jwt
        authStore.dispatch(registerAction(token))
    }

    public async login(credentials : CredentialsModel): Promise<void>{
        const reponse =  await axios.post<JwtWrapper>(appConfig.login,credentials);
        const token = reponse.data.jwt
        authStore.dispatch(loginAction(token))
    }

    public logout(): void{
        authStore.dispatch(logoutAction())
        companysStore.dispatch(fetchCouponsAction([]));
    }

}

const authService = new AuthService();

export default authService;

