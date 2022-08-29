import { delay, put, all, } from "redux-saga/effects"
import { clearStorage, signOut, asyncSignOut, authSuccess,authFail,authStart } from "../index"
import axios from "axios"

//handling auto out after certain time
// saga handling for logout after time given
export function* logoutSaga(action) {
    yield delay(action.time * 1000)
    yield put(clearStorage())
}

export function* clearlocalStorageSaga() {
    yield all([
        localStorage.removeItem('localId'),
        localStorage.removeItem('idToken'),
        localStorage.removeItem('expiresIn')
    ])
    yield put(signOut())
}


export function* autoSignInSaga(action) {
    // it will check if session storage has stored user token
    const localId = yield localStorage.getItem('localId')
    // else emit the auth success and auto logout method
    const idToken = yield localStorage.getItem('idToken')
    if (!localId || !idToken) return;
    const expiresTime = new Date(parseInt(localStorage.getItem('expiresIn')))
    yield put(authSuccess(localId, idToken))
    // now if user logged session is still valid so
    let cTime = new Date().getTime()
    if (cTime > expiresTime) { // means user session has ended 
        // dispatch  the logout function for  remaining time
        yield put(asyncSignOut((expiresTime - cTime) / 1000))
    }
}
// function that handles all authentication of user and activity
export function* authHandlerSaga(action) {
        yield put((authStart()))
        try {
            // check for if form is sign up or sing in
            let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_APP_KEY}`
            if (!action.isSignUp) {
                url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_APP_KEY}`
            }
            const response = yield axios.post(url, action.data)
            const { data: { idToken, localId } } = response
            let expiresIn = response.data.expiresIn
            yield put(authSuccess(localId, idToken))
            yield all([
                // store the user localId,idToken and expiration time in session storage so prevent user can automatically sign in
                localStorage.setItem('localId', localId),
                localStorage.setItem('idToken', idToken),
                localStorage.setItem('expiresIn', new Date().getTime() + (expiresIn * 1000))

            ])

            // save the expiresIn time which is till now 3600s
            yield put(asyncSignOut(expiresIn))
        } catch (e) {
            yield put(authFail(e.message))
        }
}