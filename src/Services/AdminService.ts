import axios from "axios";
import CouponModel from "../Models/CouponModel";
import { AdminModel, CompanyModel, CustomerModel } from "../Models/UserModel";
import CompanyListWrapper from "../Models/Wrappers/CompanyListWrapper";
import CouponsListWrapper from "../Models/Wrappers/CouponsListWrapper";
import CustomerListWrapper from "../Models/Wrappers/CustomerListWrapper";
import { adminStore,  deleteCompanyAction,  deleteCustomerAction,  fetchComapnyAction, fetchCusromerAction, updateCompanyAction, updateCustomerAction } from "../Redux/AdminState";
import { companysStore, fetchCouponsAction } from "../Redux/CompanyState";

import { customersStore } from "../Redux/CustomersState";
import appConfig from "../Utils/Config";

class AdminService{
    
    public async getAllCompanies() : Promise<CompanyModel[]>{
        
        let companys = adminStore.getState().companys;
        if(companys.length === 0){
        const response = await axios.get<CompanyListWrapper>(appConfig.getAllCompanyUrl);
        companys = response.data.companyDtoList
        adminStore.dispatch(fetchComapnyAction(companys))
        }
        return companys;
    }

    public async getAllCustomers() : Promise<CustomerModel[]>{
        let customer = adminStore.getState().customers
        if(customer.length === 0){
        const response = await axios.get<CustomerListWrapper>(appConfig.getAllCustomerUrl);
        customer = response.data.customerDtoList
        adminStore.dispatch(fetchCusromerAction(customer));
        }
        return customer;
    }

    public async deleteCustomer(customerId : number): Promise<void>{
        await axios.delete<void>(appConfig.deleteCustomerUrl + customerId)
        adminStore.dispatch(deleteCustomerAction(customerId))
    }

    public async getCustomer(customerId : number) : Promise<CustomerModel>{
        const customer = await axios.get<CustomerModel>(appConfig.getCustomerByAdmin + customerId)
        return customer.data
    }

    public async updateCustomer(customer: CustomerModel): Promise<void> {
        await axios.put<void>(appConfig.updateCustomerUrl, customer)
        adminStore.dispatch(updateCustomerAction(customer))
         
    }

    public async deleteCompany(companyId: number) : Promise<void>{
        await axios.delete<void>(appConfig.deleteCompanyUrl + companyId)
        adminStore.dispatch(deleteCompanyAction(companyId))
    }


    public async getCompany(companyId : number) : Promise<CompanyModel>{
        const company = await axios.get<CompanyModel>(appConfig.getCompanyByAdmin + companyId)
        return company.data
    }

    public async updateCompany(company: CompanyModel): Promise<void> {
        await axios.put<void>(appConfig.updateCompanyUrl, company)
        adminStore.dispatch(updateCompanyAction(company))
         
    }


    public async getAllComanyCoupons(id: number): Promise<CouponModel[]> {
        const response = await axios.get<CouponsListWrapper>(appConfig.companyCoupons + id);
        const coupons = response.data.couponDtoList;
        companysStore.dispatch(fetchCouponsAction(coupons));
        return coupons;

    }



       
}



const adminSerivce = new AdminService();

export default adminSerivce;