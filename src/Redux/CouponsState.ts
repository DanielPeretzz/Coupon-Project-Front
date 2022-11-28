import { createStore } from "redux";



import CouponModel from "../Models/CouponModel";




export class ProductsState {
    public products: CouponModel[] = [];
    public productsCart: CouponModel[] = [];

    public constructor() {
        const cart = JSON.parse(localStorage.getItem("Cart"));
        if (cart) {
            this.productsCart = cart
        }
    }

}



export enum ProductsActionType {
    FetchProducts,
    AddProduct,
    UpdateProduct,
    DeleteProduct,
    AddCart,
    FetchCart,
    RemoveCart
}

export interface ProductsAction {
    type: ProductsActionType;
    payLoad: any;
}

export function fetchProductsAction(products: CouponModel[]): ProductsAction {
    return { type: ProductsActionType.FetchProducts, payLoad: products }
}

export function removeProductsAction(id: number): ProductsAction {
    return { type: ProductsActionType.RemoveCart, payLoad: id }
}
export function addProductsAction(products: CouponModel): ProductsAction {
    return { type: ProductsActionType.AddProduct, payLoad: products }
}

export function updateProductsAction(products: CouponModel): ProductsAction {
    return { type: ProductsActionType.UpdateProduct, payLoad: products }
}

export function deleteProductsAction(id: number): ProductsAction {
    return { type: ProductsActionType.DeleteProduct, payLoad: id }
}

export function addProductCartAction(products: CouponModel): ProductsAction {
    return { type: ProductsActionType.AddCart, payLoad: products }
}


export function productsReducer(currentState = new ProductsState(), action: ProductsAction): ProductsState {


    const newState = { ...currentState };

    switch (action.type) {

        case ProductsActionType.FetchProducts:
            newState.products = action.payLoad;
            break;

        case ProductsActionType.AddProduct:
            newState.products.push(action.payLoad);
            break;

        case ProductsActionType.UpdateProduct:
            const indexToUpdate = newState.products.findIndex(p => p.id === action.payLoad.id)
            if (indexToUpdate >= 0) newState.products[indexToUpdate] = action.payLoad;
            break;

        case ProductsActionType.DeleteProduct:
            const indexToDelete = newState.products.findIndex(p => p.id === action.payLoad);
            if (indexToDelete >= 0) newState.products.splice(indexToDelete, 1)
            break;

        case ProductsActionType.AddCart:
            newState.productsCart.push(action.payLoad);
            localStorage.setItem("Cart", JSON.stringify(newState.productsCart));
            break;


        case ProductsActionType.RemoveCart:
            const indexDelete = newState.productsCart.findIndex(p => p.id === action.payLoad);
            if (indexDelete >= 0) newState.productsCart.splice(indexDelete, 1);
            localStorage.setItem("Cart", JSON.stringify(newState.productsCart))
        
            break;

    }

    return newState;
}



export const couponStore = createStore(productsReducer);