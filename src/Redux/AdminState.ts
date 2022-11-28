import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";
import { AdminModel, CompanyModel, CustomerModel } from "../Models/UserModel";




export class AdminState {
    public customers: CustomerModel[] = [];
    public companys: CompanyModel[] = [];
}

export enum AdminActionType {
    FetchCustomer = "FetchCustomer",
    FetchCompany = "FetchCompany",
    addCompany = "addCompany",
    addCustomer = "addCustomer",
    DeleteCompany = "DeleteCompany",
    DeleteCustomer = "DeleteCustomer",
    UpdateCompany = "UpdateCompany",
    UpdateCustomer = "UpdateCustomer",



}

export interface AdminAction {
    type: AdminActionType;
    payload: any;
}

export function fetchComapnyAction(company: CompanyModel[]): AdminAction {
    return { type: AdminActionType.FetchCompany, payload: company };
}
export function fetchCusromerAction(customer: CustomerModel[]): AdminAction {
    return { type: AdminActionType.FetchCustomer, payload: customer };
}

export function deleteCompanyAction(id: number): AdminAction {
    return { type: AdminActionType.DeleteCompany, payload: id }
}


export function deleteCustomerAction(id: number): AdminAction {
    return { type: AdminActionType.DeleteCustomer, payload: id }
}

export function updateCompanyAction(company: CompanyModel): AdminAction {
    return { type: AdminActionType.UpdateCompany, payload: company }
}

export function addCompanyAction(company: CompanyModel): AdminAction {
    return { type: AdminActionType.addCompany, payload: company }
}

export function updateCustomerAction(customer: CustomerModel): AdminAction {
    return { type: AdminActionType.UpdateCustomer, payload: customer }
}

export function addCustomerAction(customer: CustomerModel): AdminAction {
    return { type: AdminActionType.addCustomer, payload: customer }
}


export function adminsReducer(currentState = new AdminState(), action: AdminAction): AdminState {

    const newState = { ...currentState };

    switch (action.type) {

        case AdminActionType.FetchCompany:
            newState.companys = action.payload;
            break;


        case AdminActionType.FetchCustomer:
            newState.customers = action.payload;
            break;

        case AdminActionType.addCompany:
            newState.companys.push(action.payload);
            break

        case AdminActionType.addCustomer:
            newState.customers.push(action.payload);
            break

        case AdminActionType.DeleteCompany:
            const indexToDeleteCompany = newState.companys.findIndex(p => p.id === action.payload);
            if (indexToDeleteCompany >= 0) newState.companys.splice(indexToDeleteCompany, 1)
            break;

        case AdminActionType.DeleteCustomer:
            const indexToDeleteCustomer = newState.customers.findIndex(p => p.id === action.payload);
            if (indexToDeleteCustomer >= 0) newState.customers.splice(indexToDeleteCustomer, 1)
            break;

        case AdminActionType.UpdateCompany:
            const indexToUpdateCompany = newState.companys.findIndex(p => p.id === action.payload.id)
            if (indexToUpdateCompany >= 0) newState.companys[indexToUpdateCompany] = action.payload;
            break;

        case AdminActionType.UpdateCustomer:
            const indexToUpdateCustomer = newState.customers.findIndex(p => p.id === action.payload.id)
            if (indexToUpdateCustomer >= 0) newState.customers[indexToUpdateCustomer] = action.payload;
            break;

    }

    return newState;
}

export const adminStore = createStore(adminsReducer);
