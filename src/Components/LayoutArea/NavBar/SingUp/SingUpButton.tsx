import { Link } from "react-router-dom";
import "./SingUpButton.css";
import { GoSignIn } from "react-icons/go";


function SingUpButton(): JSX.Element {
    return (
        <Link to='/sign-up-company'>
        <button className='fill'>Join US as Company !</button>
        

      </Link>
    );
}

export default SingUpButton;

