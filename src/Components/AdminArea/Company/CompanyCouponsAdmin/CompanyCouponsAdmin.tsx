import { SyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import { adminStore } from "../../../../Redux/AdminState";
import { companysStore } from "../../../../Redux/CompanyState";
import adminSerivce from "../../../../Services/AdminService";
import companySerivce from "../../../../Services/CompanyService";
import notificationService from "../../../../Services/NotificationServ";
import CompanyCard from "../../../CompanyArea/CompanyCard/CompanyCard";


function CompanyCouponsAdmin(): JSX.Element {
    const [originalcoupons, setOriginalCoupons] = useState<CouponModel[]>([]);
    const [coupons, setCoupons] = useState<CouponModel[]>([]);
     
    const params = useParams();
    const companyId = +params.companyId;


    useEffect(() => {
      
        adminSerivce.getAllComanyCoupons(companyId).
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


    

        return (
            <div className="AllCoupons">
                {coupons.map(c => <CompanyCard key={c.id} coupon={c} />)}
            </div>
        );
}

export default CompanyCouponsAdmin;
