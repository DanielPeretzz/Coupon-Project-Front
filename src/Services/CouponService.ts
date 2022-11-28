import axios from "axios";
import CouponModel from "../Models/CouponModel";
import CouponsListWrapper from "../Models/Wrappers/CouponsListWrapper";
import { couponStore, fetchProductsAction } from "../Redux/CouponsState";



import appConfig from "../Utils/Config";

class CouponService{
    public async getAllCoupons(): Promise<CouponModel[]>{

        if (couponStore.getState().products.length === 0) {
            const response = await axios.get<CouponsListWrapper>(appConfig.allCoupons);
            const coupons = response.data.couponDtoList;
            couponStore.dispatch(fetchProductsAction(coupons))

            return coupons;
        }
        return couponStore.getState().products
    }

}



const couponService = new CouponService();

export default couponService;