import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import Role from "../../../Models/Role";
import { authStore } from "../../../Redux/AuthState";
import companySerivce from "../../../Services/CompanyService";
import couponService from "../../../Services/CouponService";
import notificationService from "../../../Services/NotificationServ";
import "../CreateCoupon/CreateCoupon.css";


function UpdateCoupon(): JSX.Element {

    const { register, handleSubmit, formState, setValue} = useForm<CouponModel>();

    const navigate = useNavigate();

    const params = useParams();
    const couponId = +params.couponId;
    const companyId = params.companyId;


    useEffect(() => {
        companySerivce.getCouponById(couponId)
        .then(coupon => {
           setValue("title",coupon.title) 
           setValue("category", coupon.category) 
           setValue("price", coupon.price) 
           setValue("amount", coupon.amount) 
           setValue("startDate", coupon.startDate) 
           setValue("endDate", coupon.endDate) 
           setValue("description", coupon.endDate) 
           setValue("image", coupon.image) 
           
        })
        
        .catch(err => notificationService.error(err))
    },[])
    

    async function send(coupon: CouponModel) {
        try {
            if(authStore.getState().user.role === Role.Company){
            coupon.companyId = authStore.getState().user.id;
            }
            else{
            coupon.companyId = companyId as unknown as number;
            }
            coupon.id = couponId
            await companySerivce.updateCoupon(coupon);
            notificationService.succses("product has been Updated!")
            if(authStore.getState().user.role === Role.Company){
            navigate("/company-coupons")
            }
            else{
            navigate("/all-companys/company-coupons-admin/" + companyId)
            }
            
            

        }
        catch (err: any) {
            notificationService.error(err);

        }
        console.log(coupon)
    }

    return (
        <div className="create-form">
            <form action="#" onSubmit={handleSubmit(send)}>
                <ul id="box">
                    <li><h1 id="special-heading">Update Coupon</h1></li>
                    <li className="inline-input"><input type="text" className="input-main" placeholder="Title"  {...register("title")} /></li>
                    <li className="inline-input">
                        <select className="input-main" {...register("category")}>
                            <option selected disabled value="" className="option">Select Category</option>
                            <option>ELECTRICITY</option>
                            <option>VACATION</option>
                            <option>FASHION</option>
                            <option>FURNITURE</option>
                            <option>COMPUTERS</option>
                            <option>MEDICINE</option>
                        </select></li>
                    <li>
                        <input id="subject-input" autoComplete="off" type="number" name="price" className="input-main" placeholder="Price" {...register("price", { valueAsNumber: true, })} />
                    </li>
                    <li>
                        <input id="subject-input" autoComplete="off" type="number" name="amount" className="input-main" placeholder="Amount"  {...register("amount", { valueAsNumber: true, })}/>
                    </li>
                    <li className="inline-input"><input type="date" className="input-main" placeholder="start"  {...register("startDate")} />
                    </li>
                    <li className="inline-input"><input type="date" className="input-main" placeholder="Title"  {...register("endDate")}/>
                    </li>
                    <li>
                        <textarea name="message" className="input-main" placeholder="Your Message To Us*"  {...register("description")}></textarea>
                    </li>
                    <li>
                        <input id="subject-input" autoComplete="off" type="text" name="price" className="input-main" placeholder="Image URL"  {...register("image")}/>
                    </li>
                    <li>
                        <button className="submit-btn">
                            Update
                        </button>
                        </li>
                </ul>
            </form>
        </div>

    );

}

export default UpdateCoupon;