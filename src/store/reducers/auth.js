import * as actionTypes from "../actionTypes"
import { updateObject } from "../utility"

const initialState={
    userId:null,
    token:null,
    loading:false,
    error:null,
    redirectPath:'/builder'
}

const authReducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.AUTH_START:return updateObject(state,{loading:true,error:null})   
        case actionTypes.AUTH_SUCCESS:return updateObject(state,{userId:action.userId,token:action.token,error:null,loading:false})   
        case actionTypes.AUTH_FAILED:return updateObject(state,{loading:false,error:action.error})   
        case actionTypes.ERROR_NOTICED:return updateObject(state,{error:null})
        case actionTypes.AUTH_LOGOUT:return updateObject(state,{userId:null,token:null})
        default:return state
    }
}

export default authReducer