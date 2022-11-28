
import { SyntheticEvent, useEffect, useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import { authStore } from "../../../Redux/AuthState";
import { companysStore } from "../../../Redux/CompanyState";
import companySerivce from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationServ";
import CompanyCard from "../CompanyCard/CompanyCard";
import "./CompanyCoupons.css";


function CompanyCoupons(): JSX.Element {
    const [originalcoupons, setOriginalCoupons] = useState<CouponModel[]>([]);
    const [coupons, setCoupons] = useState<CouponModel[]>([]);


    useEffect(() => {
        const companyId = authStore.getState().user.id;
        companySerivce.getAllComanyCoupons(companyId).
            then(coupons => {
                setOriginalCoupons([...coupons]);
                setCoupons([...coupons]);

            })
            .catch(err => notificationService.error(err));

    }, [])

    useEffect(() => {

        setCoupons(companysStore.getState().coupons);
        const unsubscribe = companysStore.subscribe(() => {
            const duplicatedCoupon = [...companysStore.getState().coupons]
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

                        <label>Filter by Price: &ensp;</label>
                        <input type="number" onChange={filterByPrice} />

                    </div>


                    <div className="category-filter" defaultValue="" onChange={filterByCategory}>
                        <h2 className="select-title">Filter by Category: &ensp;</h2>
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
                {coupons.map(c => <CompanyCard key={c.id} coupon={c} />)}
            </div></>
    );
}

export default CompanyCoupons;
