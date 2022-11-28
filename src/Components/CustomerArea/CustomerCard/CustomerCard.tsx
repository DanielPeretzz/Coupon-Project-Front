
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import CouponModel from "../../../Models/CouponModel";
import Role from "../../../Models/Role";
import { authStore } from "../../../Redux/AuthState";
import { addProductCartAction, couponStore } from "../../../Redux/CouponsState";
import notificationService from "../../../Services/NotificationServ";



import "./CustomerCard.css";


interface CouponsCardProps {
    coupon: CouponModel;
}


function CustomerCard(props: CouponsCardProps): JSX.Element {



    return (
     <div className="CouponCard-customer" >
            <div className="card-customer">

                <div className="imgBox-customer">
                { <img src={props.coupon.image} /> } 
                 </div>

                <div className="contentBox-customer">
                    <h3>{props.coupon.title}</h3>
                    <h2 className="price">{props.coupon.price}$</h2>
                    
                <div className="detalis-customer">
               
                <span className="description">Description: {props.coupon.description}</span> <br />
                Start: {props.coupon.startDate} <br />
                End: {props.coupon.endDate} <br />
                </div>          
                </div>
                <div className="category-customer">
                    {props.coupon.category} 
                </div>

            </div>
            
        </div>




    );
}

export default CustomerCard;


