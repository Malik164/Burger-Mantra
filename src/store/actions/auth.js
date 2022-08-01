import * as actionTypes from "../actionTypes"
import  axios from "axios"



// handling authentication
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
export const signOut=()=>({
    type:actionTypes.AUTH_LOGOUT
})
export const authErrorNoticed=()=>({type:actionTypes.ERROR_NOTICED})

// function that will automatically logout users

export const asyncSignOut=(time)=>{
    return dispatch=>{
        
        setTimeout(()=>{
            dispatch(signOut())
        },parseInt(time*1000))
    }
}
// function that handles all authentication of user and activity
export const asyncAuthHandler=(isSignUp,data)=>{
    // create url
    return dispatch=>{
        dispatch(authStart())
        // check for if form is sign up or sing in
        let url=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_APP_KEY}`
        if (!isSignUp) {
            url=`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_APP_KEY}`
        }

        // make a post request to firebase 
        axios.post(url,data).then(response=>{
            const {data:{idToken,localId}}=response
            dispatch(authSuccess(localId,idToken))
            let expiresIn=response.data.expiresIn
            // store the user localId,idToken and expiration time in session storage so prevent user can automatically sign in
            sessionStorage.setItem('localId',localId)
            sessionStorage.setItem('idToken',idToken)
            sessionStorage.setItem('expiresIn',new Date().getTime()+(expiresIn *1000))

            // save the expiresIn time which is till now 3600s
            dispatch(asyncSignOut(expiresIn))
        }).catch(e=>{
            dispatch(authFail(e.message))
        })

    }

}


//handling auto sign in method
export const autoSignIn=()=>{
    return  dispatch=>{
        // it will check if session storage has stored user token
        const localId=sessionStorage.getItem('localId')
        if (!localId) return;
        // else emit the auth success and auto logout method
        const idToken=sessionStorage.getItem('idToken')
        const expiresTime=new Date(parseInt(sessionStorage.getItem('expiresIn')))
        dispatch(authSuccess(localId,idToken))
        // now if user logged session is still valid so
        let cTime=new Date().getTime()
        if (cTime>expiresTime) { // means user session has ended 
            return
        }

        // dispatch  the logout function for  remaining time
        dispatch(asyncSignOut((expiresTime-cTime)/1000))

        // 

    }
}