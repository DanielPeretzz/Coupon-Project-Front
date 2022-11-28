
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import CouponModel from "../../../Models/CouponModel";
import Role from "../../../Models/Role";
import { authStore } from "../../../Redux/AuthState";
import { companysStore } from "../../../Redux/CompanyState";
import { addProductCartAction, couponStore } from "../../../Redux/CouponsState";
import companySerivce from "../../../Services/CompanyService";
import couponService from "../../../Services/CouponService";
import notificationService from "../../../Services/NotificationServ";



import "./CompanyCard.css";


interface CouponsCardProps {
    coupon: CouponModel;
}



function CompanyCard(props: CouponsCardProps): JSX.Element {
    
    const [coupon, setCoupon] = useState<CouponModel[]>();

    const navigate = useNavigate();

    function updateCouponCompany() {
        navigate("update-coupon/" + props.coupon.id)
    }

    function updateCouponAdmin() {
        navigate("update-coupon/" + props.coupon.id)
    }


    useEffect(() => {

        setCoupon(companysStore.getState().coupons);

        const unsubscribe = authStore.subscribe(() => {
            const duplicatedCoupon = [...companysStore.getState().coupons]
            setCoupon(duplicatedCoupon);
        });

        return () => {
            unsubscribe();
        };

    }, []);

    async function deleteProduct() {
        try {
            const ok = window.confirm("Are you sure?")
            if (!ok) return;
            await companySerivce.deleteCoupon(props.coupon.id);
            notificationService.succses("Coupon has been deleted!")
        }
        catch (err: any) {
            notificationService.error(err)
        }

    }



    return (
        <div className="CouponCard-company" >
        
            <div className="card-company">

                <div className="imgBox-company">
                    {<img src={props.coupon.image} />}
                </div>

                <div className="content-company">
                    <h3>{props.coupon.title}</h3>
                    <h2 className="price">{props.coupon.price}$</h2>
                    
                    <div className="detalis-company">
                        Amount : {props.coupon.amount} <br />
                        <span className="description">Description: {props.coupon.description}</span> <br />
                        Start: {props.coupon.startDate} <br />
                        End: {props.coupon.endDate} <br />
                    </div>
                    <div className="option-card">
                        {
                        authStore.getState().user.role === Role.Company &&
                        <button onClick={updateCouponCompany} className="buy">Update </button> || 
                        authStore.getState().user.role === Role.Admin && <button onClick={updateCouponAdmin} className="buy">Update </button>
                        }
                        
                        <button onClick={deleteProduct} className="buy">Delete </button>
                    </div>
                </div>
                <div className="category-company">
                    {props.coupon.category}
                </div>
            </div>
        </div>
    );
}

export default CompanyCard;


