import { CREATE_PRODUCT_RED, DELETE_PRODUCT_RED, GET_PRODUCT_RED, UPDATE_PRODUCT_RED,UPDATE_PRODUCT_QUANTITY_RED } from "../Constant";

export default function ProductReducer(state=[], action){
let newState, index
    switch(action.type){
        case CREATE_PRODUCT_RED:
            newState=[...state]
            newState.push(action.payload)
            return newState

        case GET_PRODUCT_RED:
            return action.payload

        case UPDATE_PRODUCT_RED:
            index=state.findIndex((x)=>x.id === action.payload.id)
            state[index].name = action.payload.name 
            state[index].maincategory = action.payload.maincategory 
            state[index].subcategory = action.payload.subcategory
            state[index].brand = action.payload.brand
            state[index].color = action.payload.color
            state[index].size = action.payload.size
            state[index].basePrice = action.payload.basePrice
            state[index].finalPrice = action.payload.finalPrice
            state[index].discount = action.payload.discount
            state[index].stock = action.payload.stock
            state[index].quantity = action.payload.quantity
            state[index].pic = action.payload.pic
            state[index].description = action.payload.description
            state[index].active = action.payload.active
            return state
         
            case UPDATE_PRODUCT_QUANTITY_RED:
                index=state.findIndex((x)=>x.id === action.payload.id)
                state[index].quantity = action.payload.quantity
                if(state[index].quantity===0)
                    state[index].stock=false
                return state
        
        case DELETE_PRODUCT_RED:
            return state.filter((x)=> x.id !== action.payload.id)

        
        default :
            return state
    }
}