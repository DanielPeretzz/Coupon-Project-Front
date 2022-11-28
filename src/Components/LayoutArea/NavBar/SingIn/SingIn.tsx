import { Link, NavLink } from "react-router-dom";
import "./SingIn.css";
import { GoSignIn } from "react-icons/go";

function SingIn(): JSX.Element {
    return (
        <NavLink to="sign-in">
        <button className='slide'>Login</button>
        
        
      </NavLink>
    );
}

export default SingIn;
