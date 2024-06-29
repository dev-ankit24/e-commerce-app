import { CREATE_CHECKOUT, DELETE_CHECKOUT, GET_CHECKOUT } from "../Constant";

export function createCheckout(data){
    return{
        type:CREATE_CHECKOUT,
        payload: data
    }
}

export function getCheckout(){
    return{
        type:GET_CHECKOUT
    }
}



export function deleteCheckout(data){
    return{
        type:DELETE_CHECKOUT,
        payload: data
    }
}