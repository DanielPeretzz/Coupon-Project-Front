
import "./Home.css";

import SingUpButton from "../NavBar/SingUp/SingUpButton";

import SingUpButtonCustomer from "../NavBar/SingUp/SingUpButtonCustomer";

function Home(): JSX.Element {



    return (
        <div className="home-con">
           
            <div className="con">
                <div className="home-page">
                    <div className="welcome-con">
                        <h3 className="before-title">Welcome to our </h3>
                        <h2 className="title" data-text="Coupon Website !">
                            Coupon Website !
                        </h2>
                        <div className="under">
                            <SingUpButtonCustomer /> <SingUpButton />
                        </div>
                    </div>
                </div>
                <footer className="home-footer">
                    &#169; Daniel Peretz Coupon Project Website 2022
                </footer>
            </div>
        </div>
    );
}

export default Home;
