import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { authStore } from "../../../Redux/AuthState";
import companySerivce from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationServ";
import "./CreateCoupon.css";


function CreateCoupon(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CouponModel>();

    const navigate = useNavigate();

    async function send(coupon: CouponModel) {
        try {
            coupon.companyId = authStore.getState().user.id;
            await companySerivce.createCoupon(coupon);
            notificationService.succses("product has been added!")
            navigate("/company-coupons")
           
            

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
                    <li><h1 id="special-heading">Create Coupon</h1></li>
                    <li className="inline-input"><input type="text" className="input-main" placeholder="Title" required {...register("title")} /></li>
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
                        <input id="subject-input" autoComplete="off" type="number" name="price" className="input-main" placeholder="Price" required {...register("price", { valueAsNumber: true, })} />
                    </li>
                    <li>
                        <input id="subject-input" autoComplete="off" type="number" name="amount" className="input-main" placeholder="Amount" required {...register("amount", { valueAsNumber: true, })}/>
                    </li>
                    <li className="inline-input"><input type="date" className="input-main" placeholder="start" required {...register("startDate")} />
                    </li>
                    <li className="inline-input"><input type="date" className="input-main" placeholder="Title" required {...register("endDate")}/>
                    </li>
                    <li>
                        <textarea name="message" className="input-main" placeholder="Your Message To Us*" required {...register("description")}></textarea>
                    </li>
                    <li>
                        <input id="subject-input" autoComplete="off" type="text" name="price" className="input-main" placeholder="Image URL" required {...register("image")}/>
                    </li>
                    <li>
                        <button className="submit-btn">
                            Create
                        </button>
                        </li>
                </ul>
            </form>
        </div>

    );

}

export default CreateCoupon;