import { Link } from "react-router-dom";
import "./SingUpButton.css";
import { GoSignIn } from "react-icons/go";


function SingUpButtonCustomer(): JSX.Element {
    return (
        <Link to='/sign-up-customer'>
        <button className='fill'>Join US as Customer !</button>
        

      </Link>
    );
}

export default SingUpButtonCustomer;

