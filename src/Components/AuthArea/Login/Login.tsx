import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationServ";
import "./Login.css";

function Login(): JSX.Element {
    const {register, handleSubmit} = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(user: CredentialsModel) {
        try{
            await authService.login(user);
            notificationService.succses("Welcome Back! " + authStore.getState().user.role)
            navigate("/home")
            

        }
        catch(err : any){
            notificationService.error("Your Password or UserName is incorrect!");
        }

    
    }
	
    return (
        <div className="container">
	<div className="screen">
		<div className="screen__content">
			<h2 className="title-login">Login Please</h2>
			<form className="login" onSubmit={handleSubmit(send)}>
				<div className="login__field">
					<i className="login__icon fas fa-user"></i>
                <label className="email-label">Email: </label>
                <input  type="text" className="login__input" placeholder="Enter your Email" {...register("email")} />

				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<label className="password-label">Password: </label>
                <input type="password" className="login__input" placeholder="Enter your Password" {...register("password")} />

				</div>
				<button className="button login__submit">
					<span className="button__text">Log In Now</span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
			<div className="social-login">
				<h3>log in via</h3>
				<div className="social-icons">
					<a href="#" className="social-login__icon fab fa-instagram"></a>
					<a href="#" className="social-login__icon fab fa-facebook"></a>
					<a href="#" className="social-login__icon fab fa-twitter"></a>
				</div>
			</div>
		</div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape4"></span>
			<span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape2"></span>
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
    );
}

export default Login;
