import { wait } from "@testing-library/user-event/dist/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { authStore } from "../../../Redux/AuthState";
import { couponStore } from "../../../Redux/CouponsState";
import { customersStore } from "../../../Redux/CustomersState";
import couponService from "../../../Services/CouponService";
import customerSerivce from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationServ";
import CustomerCard from "../CustomerCard/CustomerCard";
import ShoppingCard from "./ShoppingCard";
import "./ShoppingCart.css";


function ShoppingCart(): JSX.Element {

    const navigate = useNavigate();
    
    const shopping = couponStore.getState().productsCart

    function sumOfCouponPrice(): number {
        let sum = 0;
        shopping.forEach(element => { sum += element.price });
        return sum;
    }

    function tax(): number {
        const total = sumOfCouponPrice()
        return total * (5 / 100);
    }

    const [coupon, setCoupon] = useState<CouponModel[]>([]);

    useEffect(() => {

        setCoupon(JSON.parse(localStorage.getItem("Cart")));

        const unsubscribe = couponStore.subscribe(() => {
            const duplicatedCoupon = [...JSON.parse(localStorage.getItem("Cart"))]
            setCoupon(duplicatedCoupon);
        });

        return () => {
            unsubscribe();
        };

    }, []);


    function purchaseCoupon() {

        const customerId = authStore.getState().user.id
        customerSerivce.purchaseCoupon(customerId, shopping).then(
            c => notificationService.succses("Purchase Susscessfully!"))
            .catch(err => notificationService.error(err))
        localStorage.removeItem("Cart")
        navigate("/purchase")
        
        
    }


    return (
        <><h1 className="shopping-cart-title">Shopping Cart</h1>
            <div className="shopping-cart">

                <div className="column-labels">
                    <label className="product-image">Image</label>
                    <label className="product-details">Product</label>
                    <label className="product-price">Price</label>
                    <label className="product-quantity">Quantity</label>
                    <label className="product-removal">Remove</label>
                    <label className="product-line-price">Total</label>
                </div>
                { localStorage.getItem("Cart") &&
                    <div className="product">
                        {coupon.map(c => <ShoppingCard key={c.id} coupon={c} />)}
                    </div>
}
                <div className="totals">
                    <div className="totals-item">
                        <label>Subtotal</label>
                        <div className="totals-value" id="cart-subtotal">{sumOfCouponPrice()}</div>
                    </div>
                    <div className="totals-item">
                        <label>Tax (5%)</label>
                        <div className="totals-value" id="cart-tax">{tax()}</div>
                    </div>
                    <div className="totals-item totals-item-total">
                        <label>Grand Total</label>
                        <div className="totals-value" id="cart-total">{sumOfCouponPrice() + tax()}</div>
                    </div>
                </div>

                <button onClick={purchaseCoupon} className="checkout">Checkout</button>

            </div></>
    );
}

export default ShoppingCart;
