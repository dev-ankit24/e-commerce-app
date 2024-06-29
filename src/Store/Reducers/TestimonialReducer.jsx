import { CREATE_TESTIMONIAL_RED, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL_RED, UPDATE_TESTIMONIAL_RED } from "../Constant";

export default function TestimonialReducer(state=[], action){
let newState, index
    switch(action.type){
        case CREATE_TESTIMONIAL_RED:
            newState=[...state]
            newState.push(action.payload)
            return newState

        case GET_TESTIMONIAL_RED:
            return action.payload

        case UPDATE_TESTIMONIAL_RED:
            index=state.findIndex((x)=>x.id === action.payload.id)
            state[index].name=action.payload.name
            state[index].pic=action.payload.pic
            state[index].message=action.payload.message
            state[index].active=action.payload.active
            return state
        
        case DELETE_TESTIMONIAL_RED:
            return state.filter((x)=> x.id !== action.payload.id)

        
        default :
            return state
    }
}