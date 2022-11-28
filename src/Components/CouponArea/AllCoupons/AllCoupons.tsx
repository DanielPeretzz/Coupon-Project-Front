import { useEffect, useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import { couponStore } from "../../../Redux/CouponsState";
import couponService from "../../../Services/CouponService";
import notificationService from "../../../Services/NotificationServ";
import CouponCard from "../CouponCard/CouponCard";

import "./AllCoupons.css";

function AllCoupons(): JSX.Element {
    const [coupons, setcoupons] = useState<CouponModel[]>([]);
    
    useEffect(() => {
        couponService.getAllCoupons()
            .then(coupons => setcoupons(coupons))
            .catch(err => notificationService.error(err));
            
    }, []);

    useEffect(() => {

        setcoupons(couponStore.getState().products);
        const unsubscribe = couponStore.subscribe(() => {
            const duplicatedCoupon = [...couponStore.getState().products]
            setcoupons(duplicatedCoupon);
        });

        return () => {
            unsubscribe();
        };

    }, []);
    
    
    return (
        <div className="AllCoupons">
            {coupons.map(c => <CouponCard key={c.id} coupon={c} />)}
        </div>
    );
}

export default AllCoupons;
