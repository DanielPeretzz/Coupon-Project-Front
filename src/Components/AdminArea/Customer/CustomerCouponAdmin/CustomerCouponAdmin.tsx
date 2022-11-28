import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import { authStore } from "../../../../Redux/AuthState";
import { customersStore } from "../../../../Redux/CustomersState";
import customerSerivce from "../../../../Services/CustomerService";
import notificationService from "../../../../Services/NotificationServ";
import CustomerCard from "../../../CustomerArea/CustomerCard/CustomerCard";
import "../../../CustomerArea/CustomerCard/CustomerCard.css";


function CustomerCouponAdmin(): JSX.Element {
    const [originalcoupons, setOriginalCoupons] = useState<CouponModel[]>([]);
    const [coupons, setCoupons] = useState<CouponModel[]>([]);


    const params = useParams();
    const customerId = +params.customerId;


    useEffect(() => {
        customerSerivce.getAllCustomerCouponsAdmin(customerId).
            then(coupons => {
                setOriginalCoupons([...coupons]);
                setCoupons([...coupons]);

            })
            .catch(err => notificationService.error(err));

    }, [])


    useEffect(() => {

        setCoupons(customersStore.getState().coupons);
        const unsubscribe = customersStore.subscribe(() => {
            const duplicatedCoupon = [...customersStore.getState().coupons]
            setCoupons(duplicatedCoupon);
        });

        return () => {
            unsubscribe();
        };

    }, []);






    return (
            <div >
                {coupons.map(c => <CustomerCard key={c.id} coupon={c} />)}
            </div>
    );
}

export default CustomerCouponAdmin;