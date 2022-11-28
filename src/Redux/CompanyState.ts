import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";
import { CompanyModel, CustomerModel } from "../Models/UserModel";




export class CompanysState {
    public coupons: CouponModel[] = [];
    public company: CompanyModel;
}

export enum ComapnysActionType {
    FetchCoupons = "FetchCoupons",
    FetchCompany = "FetchCompany",
    AddCoupon = "AddCoupon",
    DeleteCoupon = "DeleteCoupon",
    UpdateCoupon = "UpdateCoupon"

}

export interface ComapnysAction {
    type: ComapnysActionType;
    payload: any;
}

export function fetchComapnyAction(company: CompanyModel): ComapnysAction {
    return { type: ComapnysActionType.FetchCompany, payload: company };
}
export function fetchCouponsAction(coupons: CouponModel[]): ComapnysAction {
    return { type: ComapnysActionType.FetchCoupons, payload: coupons };
}

export function newCouponAction(coupon: CouponModel): ComapnysAction {
    return { type: ComapnysActionType.AddCoupon, payload: coupon };
}

export function deleteCouponsAction(id: number): ComapnysAction {
    return { type: ComapnysActionType.DeleteCoupon, payload: id }
}

export function updateCouponsAction(products: CouponModel): ComapnysAction {
    return { type: ComapnysActionType.UpdateCoupon, payload: products }
}



export function companysReducer(currentState = new CompanysState(), action: ComapnysAction): CompanysState {

    const newState = { ...currentState };

    switch (action.type) {

        case ComapnysActionType.FetchCoupons:
            newState.coupons = action.payload;
            break;


        case ComapnysActionType.FetchCompany:
            newState.company = action.payload;
            break;

        case ComapnysActionType.AddCoupon:
            newState.coupons.push(action.payload);
            break;

        case ComapnysActionType.DeleteCoupon:
            const indexToDelete = newState.coupons.findIndex(p => p.id === action.payload);
            if (indexToDelete >= 0) newState.coupons.splice(indexToDelete, 1)
            break;

        case ComapnysActionType.UpdateCoupon:
            const indexToUpdate = newState.coupons.findIndex(p => p.id === action.payload.id)
            if (indexToUpdate >= 0) newState.coupons[indexToUpdate] = action.payload;
            break;

    }

    return newState;
}

export const companysStore = createStore(companysReducer);
