import { Notyf } from "notyf";

class NotificationServ{

    private notify = new Notyf({ duration: 4000, position: {x: "center",y: "top"}});

    public succses(message: string) : void{
            this.notify.success(message);
    }

    public error(err : any) : void{
    const message = this.extractErrorMessage(err);
        this.notify.error(message);
    }


    private extractErrorMessage(err: any): string{

        if(typeof err === "string") return err;

        if(typeof err.response?.data?.errorMsg  === "string") return err.response.data.errorMsg;

        if(typeof err.response?.data  === "string") return err.response.data;


        if(Array.isArray(err.response?.data)) return err.response.data[0];

        if(typeof err.message === "string") return err.message;

        return "some error occurred, please try again"



    }
}

const notificationService = new NotificationServ();

export default notificationService;