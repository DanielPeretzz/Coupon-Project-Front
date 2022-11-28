import axios from "axios";
import { authStore } from "../Redux/AuthState";

class InterceptorsSerivce{

    public createInterceptors(): void {

        axios.interceptors.request.use(request => {
            
            if(authStore.getState().token){
                request.headers = {
                    authorization: "Bearer " + authStore.getState().token
                }
            }
            return request;
        });
    }
}

const interceptorsService = new InterceptorsSerivce();

export default interceptorsService;