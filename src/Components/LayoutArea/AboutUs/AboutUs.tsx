import "./AboutUs.css";

function AboutUs(): JSX.Element {



    return (

        <section className="about-section">
            <div className="container">
                <div className="row clearfix">
                    <div className="content-column col-md-6 col-sm-12 col-xs-12">
                        <div className="inner-column">
                            <div className="sec-title">
                                <div className="title">About Us</div>
                                <h2>We Are Coupon Project Webiste </h2>
                            </div>
                            <div className="text">Our company offers a variety of services in the field of coupons for various companies in the industry
                                The services provided: <br />
                                1- Management of all companies coupons<br />
                                2- Companies have full access to managing their coupons (create,edit,delete)<br />
                                3- Shopping experience for the users<br />
                                4- All customers can view and manage their coupons conveniently
                                <br /></div>
                            <div className="email">Request: <span className="theme_color">danielperetz111@gmail.com</span></div>

                        </div>
                    </div>


                </div>
            </div>
        </section>

    );
}

export default AboutUs;
