import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Cart.css";

function Cart(): JSX.Element {
    return (
        <NavLink to="shopping-cart">
        <button className='fill'><FaShoppingCart className="FaShoppingCart"/></button>
        
        
      </NavLink>
    );
}

export default Cart;
