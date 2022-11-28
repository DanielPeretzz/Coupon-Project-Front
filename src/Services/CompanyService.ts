import axios from "axios";
import CouponModel from "../Models/CouponModel";
import { CompanyModel } from "../Models/UserModel";
import CouponsListWrapper from "../Models/Wrappers/CouponsListWrapper";
import { companysStore, deleteCouponsAction, fetchComapnyAction, fetchCouponsAction, newCouponAction, updateCouponsAction } from "../Redux/CompanyState";
import { addProductsAction, couponStore, deleteProductsAction, updateProductsAction } from "../Redux/CouponsState";
import appConfig from "../Utils/Config";

class CompanyService{
    public async getAllComanyCoupons(id: number): Promise<CouponModel[]> {
            let coupons = companysStore.getState().coupons;
            if(coupons.length === 0){
            const response = await axios.get<CouponsListWrapper>(appConfig.companyCoupons + id);
            coupons = response.data.couponDtoList;
            companysStore.dispatch(fetchCouponsAction(coupons));
            }
            return coupons;
    }

    

    public async getCompany(id: number): Promise<CompanyModel> {

        let company = companysStore.getState().company;
        if (!company) {
            const response = await axios.get<CompanyModel>(appConfig.companyUrl + id);
            company = response.data;
            companysStore.dispatch(fetchComapnyAction(company));
        }
        return company;
    }


    public async createCoupon(coupon: CouponModel): Promise<void> {

        const response = await axios.post<CouponModel>(appConfig.createCouponUrl, coupon)
        const addedProduct = response.data;
        companysStore.dispatch(newCouponAction(addedProduct))
        couponStore.dispatch(addProductsAction(addedProduct))
    }


    public async deleteCoupon(id :number): Promise<void> {

       await axios.delete<void>(appConfig.deleteCouponUrl+id)
        companysStore.dispatch(deleteCouponsAction(id))
        couponStore.dispatch(deleteProductsAction(id))
        
    }

    
    public async updateCoupon(coupon: CouponModel): Promise<void> {

        await axios.put<void>(appConfig.updateCouponUrl, coupon)
        companysStore.dispatch(updateCouponsAction(coupon))
        couponStore.dispatch(updateProductsAction(coupon))
        
    }
    
    public async getCouponById(id: number): Promise<CouponModel> {
        const products = companysStore.getState().coupons.find(p => p.id === id)
        return products;
    }

}


const companySerivce = new CompanyService();

export default companySerivce;