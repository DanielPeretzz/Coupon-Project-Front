import { useEffect, useState } from "react";
import { CompanyModel } from "../../../../Models/UserModel";
import { adminStore } from "../../../../Redux/AdminState";
import adminSerivce from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationServ";
import CompanyProfileCard from "../CompanyProfileCard/CompanyProfileCard";


function CompaniesProfile(): JSX.Element {
    const [company, setCompany] = useState<CompanyModel[]>([]);

    useEffect(() => {
        adminSerivce.getAllCompanies()
            .then(company => {
                setCompany([...company])
            })
            .catch(err => notificationService.error(err))

    }, []);


    
    useEffect(() => {

        setCompany(adminStore.getState().companys);
        

        const unsubscribe = adminStore.subscribe(() => {
            const dup = [...adminStore.getState().companys]
            setCompany(dup);
        });

        return () => {
            unsubscribe();
        };

    }, []);



    return (
        <div className="customer-profile">
            {company.map(c => <CompanyProfileCard key={c.id} company={c} />)}
        </div>
   
    );
}

export default CompaniesProfile;