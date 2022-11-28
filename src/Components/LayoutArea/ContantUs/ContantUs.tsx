
import { useNavigate } from "react-router-dom";
import notificationService from "../../../Services/NotificationServ";
import "./ContantUs.css";

function ContantUs(): JSX.Element {

	const navigate = useNavigate();

function contactSend(){
	notificationService.succses("Thank you for contacting us, we will return you as soon as possible!");
	navigate("/home");

}

    return (
        <div className="container-contant">
		<div className="contact-box">
			<div className="left"></div>
			<div className="right">
				<h2 className="title-contant">Contact Us</h2>
				<input type="text" className="field-cntant" placeholder="Your Name"/>
				<input type="text" className="field-cntant" placeholder="Your Email"/>
				<input type="text" className="field-cntant" placeholder="Phone"/>
				<textarea placeholder="Message" className="text-cntant"></textarea>
				<button onClick={contactSend} className="btn-contant">Send</button>
			</div>
		</div>
	</div>
    );
}

export default ContantUs;


