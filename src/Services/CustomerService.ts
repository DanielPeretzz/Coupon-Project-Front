import axios from "axios";
import { useNavigate } from "react-router-dom";
import CouponModel from "../Models/CouponModel";
import { CustomerModel } from "../Models/UserModel";
import CouponsListWrapper from "../Models/Wrappers/CouponsListWrapper";
import { authStore } from "../Redux/AuthState";
import { couponStore, updateProductsAction } from "../Redux/CouponsState";
import { buyCouponAction, customersStore, fetchCouponsAction, fetchCustomerAction } from "../Redux/CustomersState";
import appConfig from "../Utils/Config";




class CustomerSerivce {

    public async getAllCustomerCoupons(id: number): Promise<CouponModel[]> {

        let coupons = customersStore.getState().coupons;
        if (coupons.length === 0) {
            const response = await axios.get<CouponsListWrapper>(appConfig.customersCouponsUrl + id);
            coupons = response.data.couponDtoList;
            customersStore.dispatch(fetchCouponsAction(coupons));
        }
        return coupons;
    }

    public async getAllCustomerCouponsAdmin(id: number): Promise<CouponModel[]> {
        const response = await axios.get<CouponsListWrapper>(appConfig.customersCouponsUrl + id);
        const coupons = response.data.couponDtoList;
        customersStore.dispatch(fetchCouponsAction(coupons));
    
    return coupons;
}



    public async getCustomer(id: number): Promise<CustomerModel> {

        let customer = customersStore.getState().customer;
        if (!customer) {
            const response = await axios.get<CustomerModel>(appConfig.customerUrl + id);
            customer = response.data;
            customersStore.dispatch(fetchCustomerAction(customer));
        }
        return customer;
    }

    public async purchaseCoupon(id: number, coupons : CouponModel[]): Promise<void> {

        coupons.forEach(async element => {
            const coupon = await axios.post<CouponModel>(appConfig.customerPurchaseUrl+id+"/"+element.id)
            customersStore.dispatch(buyCouponAction(element))
            console.log(coupon.data)
            couponStore.dispatch(updateProductsAction(coupon.data));
          });
         
            
      
    }
}




const customerSerivce = new CustomerSerivce();

export default customerSerivce;