import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";
import { CustomerModel } from "../Models/UserModel";




export class CustomersState {
    public coupons: CouponModel[] = [];
    public customer: CustomerModel;
}

export enum CustomersActionType {
    FetchCoupons = "FetchCoupons",
    BuyCoupon = "BuyCoupon",
    FetchCustomer = "FetchCustomer",
  
}

export interface CustomersAction {
    type: CustomersActionType;
    payload: any;
}

export function fetchCustomerAction(customer: CustomerModel): CustomersAction {
    return { type: CustomersActionType.FetchCustomer, payload: customer };
}
export function fetchCouponsAction(coupons: CouponModel[]): CustomersAction {
    return { type: CustomersActionType.FetchCoupons, payload: coupons };
}

export function buyCouponAction(coupon: CouponModel): CustomersAction {
    return { type: CustomersActionType.BuyCoupon, payload: coupon };
}

export function customersReducer(currentState = new CustomersState(), action: CustomersAction): CustomersState {

    const newState = { ...currentState };

    switch (action.type) {

        case CustomersActionType.FetchCoupons:
            newState.coupons = action.payload;
            break;

        case CustomersActionType.BuyCoupon:
            newState.coupons.push(action.payload);
            break;
        
        case CustomersActionType.FetchCustomer:
            newState.customer = action.payload;
            break;
        

    }

    return newState;
}

export const customersStore = createStore(customersReducer);
