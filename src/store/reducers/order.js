import * as actionTypes from "../actionTypes"
import { updateObject } from "../utility"

const initialState={
    orders:[],
    error:false,
    loading:false,
    purchased:false
}

const orderReducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.PLACE_ORDER_INIT:return updateObject(state,{loading:true})   
        case actionTypes.PLACE_ORDER_SUCCESS:return updateObject(state,
            {loading:false,
            error:false,
            // orders:[...state.orders,action.orderData],
            purchased:true
            })
        case actionTypes.PLACE_ORDER_FAILED:return updateObject(state,{loading:false,error:action.error})
        case actionTypes.ERROR_NOTICED:return updateObject(state,{error:null})
        case actionTypes.PURCHASE_INIT:return updateObject(state,{purchased:false})
        case actionTypes.FETCH_ORDER_INIT:return updateObject(state,{loading:true,error:false,orders:[]})
        case actionTypes.FETCH_ORDER_SUCCESSS:return updateObject(state,{
            loading:false,
            error:false,
            orders:[...action.orders]
        })
        case actionTypes.FETCH_ORDER_FAILED:return updateObject(state,{
            loading:false,
            error:action.error,
            orders:null
        })
        default:
            return state
    }
}

export default orderReducer