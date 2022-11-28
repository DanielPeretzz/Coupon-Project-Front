import { Route, Routes } from "react-router-dom";
import AdminProfile from "../../AdminArea/AdminProfile/AdminProfile";
import CompaniesProfile from "../../AdminArea/Company/CompaniesProfile/CompaniesProfile";
import CompanyCouponsAdmin from "../../AdminArea/Company/CompanyCouponsAdmin/CompanyCouponsAdmin";
import UpdateCompany from "../../AdminArea/Company/UpdateCompanyAdmin/UpdateCompanyAdmin";
import CustomerCouponAdmin from "../../AdminArea/Customer/CustomerCouponAdmin/CustomerCouponAdmin";
import CustomersProfile from "../../AdminArea/Customer/CustomersProfile/CustomersProfile";
import UpdateCustomer from "../../AdminArea/Customer/UpdateCustomer/UpdateCustomer";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/RegisterCompany/RegisterCompany";
import RegisterCutomer from "../../AuthArea/RegisterCutomer/RegisterCutomer";
import CompanyCoupons from "../../CompanyArea/CompanyCoupons/CompanyCoupons";
import CompanyProfile from "../../CompanyArea/CompanyProfile/CompanyProfile";
import CreateCoupon from "../../CompanyArea/CreateCoupon/CreateCoupon";
import UpdateCoupon from "../../CompanyArea/UpdateCoupon/UpdateCoupon";
import AllCoupons from "../../CouponArea/AllCoupons/AllCoupons";
import CustomerCoupon from "../../CustomerArea/CustomerCoupon/CustomerCoupon";
import Coupon from "../../CustomerArea/CustomerCoupon/CustomerCoupon";
import CustomerProfile from "../../CustomerArea/CustomerProfile/CustomerProfile";
import ShoppingCart from "../../CustomerArea/ShoppingCart/ShoppingCart";
import AboutUs from "../AboutUs/AboutUs";
import ContantUs from "../ContantUs/ContantUs";

import Home from "../Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
        <Routes>

            <Route path="/home" element={<Home/>} />

            <Route path="/" element={<Home/>} />

            <Route path="*" element={<PageNotFound/>}/>.

            <Route path="/contact-us" element={<ContantUs/>}/>

            <Route path="/about" element={<AboutUs/>}/>

            <Route path="/sign-up-company" element={<Register/>} />
            
            <Route path="/sign-up-customer" element={<RegisterCutomer/>} />

            <Route path="/sign-in" element={<Login/>} />

            <Route path="/logout" element={<Logout />} />

            <Route path="/shopping-cart" element={<ShoppingCart />} />

            <Route path="/products" element={<AllCoupons />} />

            <Route path="/purchase" element={<CustomerCoupon />} />

            <Route path="/company-coupons" element={<CompanyCoupons/>} />

            <Route path="/profile-customer" element={<CustomerProfile />} />

            <Route path="/profile-company" element={<CompanyProfile />} />

            <Route path="/create-coupon" element={<CreateCoupon />} />

            <Route path="/company-coupons/update-coupon/:couponId" element={<UpdateCoupon />} />
            
            <Route path="/all-customers/update-customer/:customerId" element={<UpdateCustomer />} />

            <Route path="/all-companys/update-company/:companyId" element={<UpdateCompany />} />

            <Route path="/all-companys/company-coupons-admin/:companyId" element={<CompanyCouponsAdmin />} />

            <Route path="/all-companys/company-coupons-admin/:companyId/update-coupon/:couponId" element={<UpdateCoupon />} />

            <Route path="/all-customers/customer-coupons-admin/:customerId" element={<CustomerCouponAdmin />} />

            <Route path="/all-customers" element={<CustomersProfile />} />

            <Route path="/all-companys" element={<CompaniesProfile/>} />


            <Route path="/admin-profile" element={<AdminProfile/>} />
       
        </Routes>
    </div>
    );
}

export default Routing;
