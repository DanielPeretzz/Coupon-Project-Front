import CouponModel from "../../../Models/CouponModel";
import { couponStore, removeProductsAction } from "../../../Redux/CouponsState";

interface CouponsCardProps {
    coupon: CouponModel;
}

function ShoppingCard(props : CouponsCardProps): JSX.Element {
    
        function remove(){
            couponStore.dispatch(removeProductsAction(props.coupon.id))
            
        }
 
   
    return (
        <div className="product">
        <div className="product-image">
            <img src={props.coupon.image}/>
            </div>
        <div className="product-details">
            <div className="product-title">{props.coupon.title}</div>
            <p className="product-description">{props.coupon.description}</p>
        </div>
        <div className="product-price">{props.coupon.price}</div>
        <div className="product-quantity">
            <input  value="1"/>
            </div>
        <div className="product-removal">
            <button onClick={remove} className="remove-product">
                Remove
            </button>
        </div>
        <div className="product-line-price">{props.coupon.price}</div>
    </div>
    );
}

export default ShoppingCard;