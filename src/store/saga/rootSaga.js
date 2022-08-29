// here export a root saga watcher for all sagas
import {takeEvery,takeLatest} from "redux-saga/effects"
import * as actionTypes from "../actionTypes"
import { authHandlerSaga, autoSignInSaga, clearlocalStorageSaga, logoutSaga } from "./authSaga"
import { builderSaga } from "./builderSaga"
import { fetchOrderSaga, placeOrderSaga } from "./orderSaga"

export function* rootSaga() {
    yield takeEvery(actionTypes.FETCH_INGREDIENTS_START,builderSaga)
    yield takeEvery(actionTypes.AUTH_LOGOUT_START,logoutSaga)
    yield takeEvery(actionTypes.CLEAR_SESSION_STORAGE,clearlocalStorageSaga)
    yield takeEvery(actionTypes.AUTH_AUTO_SIGN_IN,autoSignInSaga)
    yield takeLatest(actionTypes.AUTH_REQ_START,authHandlerSaga)
    yield takeEvery(actionTypes.FETCH_ORDER_START,fetchOrderSaga)
    yield takeEvery(actionTypes.PLACE_ORDER_START,placeOrderSaga)
}