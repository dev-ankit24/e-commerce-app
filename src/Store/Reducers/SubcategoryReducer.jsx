import { CREATE_SUBCATEGORY_RED, DELETE_SUBCATEGORY_RED, GET_SUBCATEGORY_RED, UPDATE_SUBCATEGORY_RED } from "../Constant";

export default function SubcategoryReducer(state=[], action){
let newState, index
    switch(action.type){
        case CREATE_SUBCATEGORY_RED:
            newState=[...state]
            newState.push(action.payload)
            return newState

        case GET_SUBCATEGORY_RED:
            return action.payload

        case UPDATE_SUBCATEGORY_RED:
            index=state.findIndex((x)=>x.id === action.payload.id)
            state[index].name=action.payload.name
            state[index].active=action.payload.active
            return state
        
        case DELETE_SUBCATEGORY_RED:
            index=state.findIndex((x)=> x.id === action.payload.id)
            newState=state.filter((x)=> x.id !== action.payload.id)
            return newState
        
        default :
            return state
    }
}