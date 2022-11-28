import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyModel, CustomerModel } from "../../../../Models/UserModel";
import adminSerivce from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationServ";




function UpdateCompanyAdmin(): JSX.Element {


    const { register, handleSubmit, formState, setValue } = useForm<CompanyModel>();

    const navigate = useNavigate();

    const params = useParams();
    const companyId = +params.companyId;


    useEffect(() => {
        adminSerivce.getCompany(companyId)
            .then(company => {
                setValue("name", company.name)
                setValue("email", company.email)
               

            })

            .catch(err => notificationService.error(err))
    }, [])


    async function send(company: CompanyModel) {
        try {

            company.id = companyId
            await adminSerivce.updateCompany(company);
            notificationService.succses("Company has been Updated!")
            navigate("/all-companys")


        }
        catch (err: any) {
            notificationService.error(err);

        }

    }


    return (
        <div className="create-form">
        <form action="#" onSubmit={handleSubmit(send)}>
            <ul id="box">
                <li><h1 id="special-heading">Update Company</h1></li> <br />
                <h3>Company Name : </h3> <br />
                <li className="inline-input"><input type="text" className="input-main" placeholder="Company Name" required {...register("name")}/></li> <br />
                <h3>Email :</h3> <br />
                <li className="inline-input"><input type="text" className="input-main" placeholder="Email" required {...register("email")}/></li>  <br />
                
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

export default UpdateCompanyAdmin;