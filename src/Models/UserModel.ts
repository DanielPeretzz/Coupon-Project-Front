import CouponModel from "./CouponModel";
import Role from "./Role";

export abstract class BaseUserModel {
	public id: number;
    public email: string;
    public role: Role;
    public password: string;
}

export class CustomerModel extends BaseUserModel {
    public firstName: string;
    public lastName: string;
    public couponDtoList: CouponModel[]
}

export class CompanyModel extends BaseUserModel {
    public name: string;
    public couponDtoList: CouponModel[]
}

export class AdminModel extends BaseUserModel {
    public id: number;
    public email: string;
    public role: Role;
}


export default BaseUserModel;