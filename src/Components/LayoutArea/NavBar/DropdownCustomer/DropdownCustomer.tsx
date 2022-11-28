import { useState } from "react";
import { Link } from "react-router-dom";
import { AdminItems, CustomerItems} from "../MenuItems";
import "./DropdownCustomer.css";

function DropdownCustomer(): JSX.Element {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
  
    return (
        <>
        <ul
          onClick={handleClick}
          className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
        >
          {CustomerItems.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  className={item.cName}
                  to={item.path}
                  onClick={() => setClick(false)}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    );
}

export default DropdownCustomer;
