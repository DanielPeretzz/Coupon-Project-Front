import { SyntheticEvent, useEffect, useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import { authStore } from "../../../Redux/AuthState";
import { customersStore } from "../../../Redux/CustomersState";
import customerSerivce from "../../../Services/CustomerService";

import notificationService from "../../../Services/NotificationServ";
import CouponCard from "../../CouponArea/CouponCard/CouponCard";
import CustomerCard from "../CustomerCard/CustomerCard";

import "./CustomerCoupon.css";


function CustomerCoupon(): JSX.Element {
    const [originalcoupons, setOriginalCoupons] = useState<CouponModel[]>([]);
    const [coupons, setCoupons] = useState<CouponModel[]>([]);


    useEffect(() => {
        const customerId = authStore.getState().user.id;
        customerSerivce.getAllCustomerCoupons(customerId).
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






    function filterByPrice(args: SyntheticEvent) {

        const input = args.target as HTMLInputElement;
        const maxPrice = +input.value;
        if (input.value === "") {
            setCoupons(originalcoupons);
            const filteredCoupons = coupons.filter(c => c.price <= maxPrice);
            setCoupons(filteredCoupons);
        } else {

            const filteredCoupons = originalcoupons.filter(c => c.price <= maxPrice);
            setCoupons(filteredCoupons);
        }
    }

    function filterByCategory(args: SyntheticEvent) {
        const select = args.target as HTMLSelectElement;
        const category = select.value;
        const filteredCoupons = originalcoupons.filter(c => c.category === category);


        setCoupons(filteredCoupons);

    }
    return (

        <>
            <div className="filter-con">
                <div className="filter-area">
                    <div className="filterPrice">

                        <label className="filter-title">Filter by Price: &ensp;</label>
                        <input type="number" onChange={filterByPrice} />

                    </div>


                    <div className="category-filter" defaultValue="" onChange={filterByCategory}>
                        <h2 className="select-title">Filter by Category:&ensp;</h2>
                        <select>
                            <option selected disabled value="" className="option">Select Category</option>
                            <option>ELECTRICITY</option>
                            <option>VACATION</option>
                            <option>FASHION</option>
                            <option>FURNITURE</option>
                            <option>COMPUTERS</option>
                            <option>MEDICINE</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="AllCoupons">
                {coupons.map(c => <CustomerCard key={c.id} coupon={c} />)}
            </div></>
    );
}

export default CustomerCoupon;
