import { CREATE_WISHLIST, DELETE_WISHLIST, GET_WISHLIST} from "../../Store/Constant";

export function createWishlist(data){
    return{
        type:CREATE_WISHLIST,
        payload: data
    }
}

export function getWishlist(){
    return{
        type:GET_WISHLIST
    }
}

// export function get


export function deleteWishlist(data){
    return{
        type:DELETE_WISHLIST,
        payload: data
    }
}