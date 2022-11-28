import { Link } from "react-router-dom";
import "./LogoutButton.css";
import { GoSignIn } from "react-icons/go";
import { authStore } from "../../../../Redux/AuthState";


function LogoutButton(): JSX.Element {
    return (
        <Link to='logout'>
        <button className='fill'>Logout</button>
        

      </Link>
    );
}

export default LogoutButton;

