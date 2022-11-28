import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerModel } from "../../../../Models/UserModel";
import adminSerivce from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationServ";




function UpdateCustomer(): JSX.Element {


    const { register, handleSubmit, formState, setValue } = useForm<CustomerModel>();

    const navigate = useNavigate();

    const params = useParams();
    const customerId = +params.customerId;


    useEffect(() => {
        adminSerivce.getCustomer(customerId)
            .then(customer => {
                setValue("firstName", customer.firstName)
                setValue("lastName", customer.lastName)
                setValue("email", customer.email)

            })

            .catch(err => notificationService.error(err))
    }, [])


    async function send(customer: CustomerModel) {
        try {

            customer.id = customerId
            await adminSerivce.updateCustomer(customer);
            notificationService.succses("Customer has been Updated!")
            navigate("/all-customers")


        }
        catch (err: any) {
            notificationService.error(err);

        }

    }


    return (
        <div className="create-form">
        <form action="#" onSubmit={handleSubmit(send)}>
            <ul id="box">
                <li><h1 id="special-heading">Update Customer</h1></li> <br />
                <h3>first Name : </h3> <br />
                <li className="inline-input"><input type="text" className="input-main" placeholder="First Name" required {...register("firstName")}/></li> <br />
                <h3>Last Name :</h3> <br />
                <li className="inline-input"><input type="text" className="input-main" placeholder="Last Name" required {...register("lastName")}/></li>  <br />
                <h3>Email :</h3> <br />
                <li className="inline-input"><input type="text" className="input-main" placeholder="Email" required {...register("email")}/></li>
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

export default UpdateCustomer;