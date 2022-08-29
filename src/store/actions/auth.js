import * as actionTypes from "../actionTypes"
export const authStart=()=>({
    type:actionTypes.AUTH_START
})
export const authSuccess=(userId,token)=>({
    type:actionTypes.AUTH_SUCCESS,
    userId,token
})
export const authFail=(error)=>({
    type:actionTypes.AUTH_FAILED,
    error
})

export const clearStorage=()=>({
    type:actionTypes.CLEAR_SESSION_STORAGE
})

export const signOut=()=>({
    type:actionTypes.AUTH_LOGOUT
})
export const authErrorNoticed=()=>({type:actionTypes.ERROR_NOTICED})

// function that will automatically logout users

export const asyncSignOut=(time)=>{
    return{
        type:actionTypes.AUTH_LOGOUT_START,
        time
    }
}
export const asyncAuthHandler=(isSignUp,data)=>{
    return {
        type:actionTypes.AUTH_REQ_START,
        isSignUp,data
    }
}



export const autoSignIn=()=>{
    return {
        type:actionTypes.AUTH_AUTO_SIGN_IN
    }
}