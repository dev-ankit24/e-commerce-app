import { CREATE_SUBCATEGORY, DELETE_SUBCATEGORY, GET_SUBCATEGORY, UPDATE_SUBCATEGORY } from "../Constant";

export function createSubcategory(data){
    return{
        type:CREATE_SUBCATEGORY,
        payload: data
    }
}

export function getSubcategory(){
    return{
        type:GET_SUBCATEGORY
    }
}

export function updateSubcategory(data){
    return{
        type:UPDATE_SUBCATEGORY,
        payload: data
    }
}

export function deleteSubcategory(data){
    return{
        type:DELETE_SUBCATEGORY,
        payload: data
    }
}