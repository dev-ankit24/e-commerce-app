import { CREATE_WISHLIST_RED, DELETE_WISHLIST_RED, GET_WISHLIST_RED } from "../Constant";

export default function WishlistReducer(state=[], action){
let newState
    switch(action.type){
        case CREATE_WISHLIST_RED:
            newState=[...state]
            newState.push(action.payload)
            return newState

        case GET_WISHLIST_RED:
            return action.payload

        
        case DELETE_WISHLIST_RED:
            return state.filter((x)=> x.id !== action.payload.id)

        
        default :
            return state
    }
}