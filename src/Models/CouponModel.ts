import Category from "./Category";

class CouponModel {
    public id: number;
    public title: string;
    public companyId: number;
    public category: Category;
    public description: string;
    public startDate: string;
    public endDate: string;
    public amount: number;
    public price: number;
    public image: string;
}

export default CouponModel;