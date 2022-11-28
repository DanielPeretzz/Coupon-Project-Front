import "./NavBar.css";
import {Link} from "react-router-dom"
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "./SingUp/SingUpButton";
import Logo from "../../../Assets/Images/Logo.png"

import SingUpButton from "./SingUp/SingUpButton";
import SingIn from "./SingIn/SingIn";

import { AuthState, authStore } from "../../../Redux/AuthState";
import Role from "../../../Models/Role";
import DropdownAdmin from "./DropdownAdmin/DropdownAdmin";
import Cart from "./CartBtn/Cart";
import Logout from "../../AuthArea/Logout/Logout";
import LogoutButton from "./LogoutButton/LogoutButton";

import { BaseUserModel } from "../../../Models/UserModel";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import DropdownCustomer from "./DropdownCustomer/DropdownCustomer";
import DropdownCompany from "./DropdownCompany/DropdownCompany";


function NavBar(): JSX.Element {
  const [user, setUser] = useState<BaseUserModel>();

  useEffect(() => {

    setUser(authStore.getState().user);

    const unsubscribe = authStore.subscribe(() => {
        setUser(authStore.getState().user);
    });

    return () => {
        unsubscribe();
    };

}, []);

    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);
  
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
  
    const onMouseEnter = () => {
      if (window.innerWidth < 960) {
        setDropdown(false);
      } else {
        setDropdown(true);
      }
    };
  
    const onMouseLeave = () => {
      if (window.innerWidth < 960) {
        setDropdown(false);
      } else {
        setDropdown(false);
      }
    };
    return (
<>
      <nav className='navbar'>
        <Link to='/home' className='navbar-logo' onClick={closeMobileMenu}>
          <img src={Logo} alt="" className="logo-img"/>
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <NavLink to='/home' className='nav-links' onClick={closeMobileMenu}>
              Home
            </NavLink>
          </li>

          {authStore.getState().token != null && 

          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            
            <Link
            
              to='/services'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              DashBoard <i className='fas fa-caret-down' />
            </Link>

            
            {dropdown && 
            (authStore.getState().user.role === Role.Admin && <DropdownAdmin/> || 
            authStore.getState().user.role === Role.Customer && <DropdownCustomer/> ||
            authStore.getState().user.role === Role.Company && <DropdownCompany/> )  }
            
            
          </li>
}
          <li className='nav-item'>
            <Link
              to='/products'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Products
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/about'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              About Us
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/contact-us'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to='/sign-up'
              className='nav-links-mobile'
              onClick={closeMobileMenu}
            >
              Register
            </Link>
            
          </li>
          <li>
            <Link
              to='/sign-in'
              className='nav-links-mobile'
              onClick={closeMobileMenu}
            >
              Login
            </Link>
          </li>
        </ul>
        {authStore.getState().token === null && 
        <ul className="login-bt">
         <SingIn/>
        </ul>
        }
        {authStore.getState().token != null && <LogoutButton/>}
        {authStore.getState().token != null && authStore.getState().user.role === Role.Customer  && <Cart/> }
        
      </nav>
    </>
    );
}

export default NavBar;


