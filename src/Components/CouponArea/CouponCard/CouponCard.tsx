
import { NotyfNotification } from "notyf";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import CouponModel from "../../../Models/CouponModel";
import Role from "../../../Models/Role";
import { authStore } from "../../../Redux/AuthState";
import { addProductCartAction, couponStore } from "../../../Redux/CouponsState";
import customerSerivce from "../../../Services/CustomerService";

import notificationService from "../../../Services/NotificationServ";




import "./CouponCard.css";


interface CouponsCardProps {
    coupon: CouponModel;
}


function CouponCard(props: CouponsCardProps): JSX.Element {

    const [customerCoupons, setCustomerCoupons] = useState<CouponModel[]>([]);

    
        useEffect(() => {
        if(authStore.getState().token && authStore.getState().user.role === Role.Customer){
        customerSerivce.getAllCustomerCoupons(authStore.getState().user.id)
        .then(c => setCustomerCoupons(c))
        .catch(err => notificationService.error(err))
        }
    },[])

  
    async function addToCart() {

        const storage = couponStore.getState().productsCart;

        const isFoundInCoupon = (await customerCoupons).some(element => {
            if (element.id === props.coupon.id) {
                return true;
            }
            else {
                return false;
            }
        });

        const isFound = storage.some(element => {
            if (element.id === props.coupon.id) {
                return true;
            }
            return false;
        });

        if(isFoundInCoupon){
            notificationService.error("You already purcashe this coupon")
        }
        else if(props.coupon.amount === 0){
            notificationService.error("This Coupon is Out of Stock")
        }
        else if (!isFound ) {
            couponStore.dispatch(addProductCartAction(props.coupon))
            notificationService.succses(props.coupon.title + "added Successfully!")
        }
        else {
            notificationService.error("You already added this coupon")
        }

    }



    return (
        <div className="CouponCard-all" >
           
            <div className="card-all">

                <div className="imgBox-all">
                    {<img src={props.coupon.image} />}
                </div>

                <div className="contentBox-all">
                    <h3>{props.coupon.title}</h3>
                    <h2 className="price">{props.coupon.price}$</h2>

                    <div className="detalis-all">
                        <span className="description-all">Description: {props.coupon.description}</span> <br />
                        Start: {props.coupon.startDate} <br />
                        End: {props.coupon.endDate} <br />
                        Amount:{props.coupon.amount}
                    </div>
                    <div>
                        {(authStore.getState().token && authStore.getState().user.role === Role.Customer)  &&
                            <button onClick={addToCart} className="buy">Add to Cart</button>
                        }
                    </div>

                </div>
                <div className="category-all">
                    {props.coupon.category}
                </div>

            </div>

        </div>
                    


    );
}

export default CouponCard;


