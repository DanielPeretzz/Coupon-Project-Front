import { useEffect, useState } from "react";
import { AdminModel } from "../../../Models/UserModel";
import { adminStore } from "../../../Redux/AdminState";
import { authStore } from "../../../Redux/AuthState";
import adminSerivce from "../../../Services/AdminService";
import "./AdminProfile.css";

import adminImage from "../../../Assets/Images/admin-logo.png"
import Role from "../../../Models/Role";

function AdminProfile(): JSX.Element {

    const admin = authStore.getState().user

    return (
        
        <div >
            {authStore.getState().user.role === Role.Admin &&
        <div className="card-profile">
            
        <div className="ds-top">
            <h2>&nbsp;AdminID : {admin.id}</h2>
        </div>
            
        <div className="avatar-holder">
            
          <img src={adminImage} alt="Albert Einstein"/>
        </div>
        <div className="button">
            <br />
          <a href="#" className="btn" >Email : {admin.email + " "}<i className="fas fa-user-plus"></i></a>
        </div>

        <div className="ds-skill">
                <h6>Role : {admin.role}</h6>
        </div>
      </div>
            }
        </div>
    );
}

export default AdminProfile;