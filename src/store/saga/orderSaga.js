import {all, call,put, select} from "redux-saga/effects"
import {fethOrderInit,fetchOrderSuccess,fetchOrderFail,placingOrderInit,placingOrderSuccess,placingOrderFail,resetPrice} from "../"
import axios from "../../components/OrderAxios/OrderAxios"

const getCredentials=state=> {
    let {auth:{token,userId}}=state
    return{token,userId}
}
export function* fetchOrderSaga(action){
    yield put(fethOrderInit())
    console.log('i am inside fetching order init');
    const {token,userId}=yield select(getCredentials)
    if(!token || !userId) return
    try {
        const response=yield call(axios,`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
        const orders= Object.keys(response.data).map(key =>response.data[key])
        yield put(fetchOrderSuccess(orders))
        
    } catch (e) {
        yield put(fetchOrderFail(e.message))
    }        
}


export function* placeOrderSaga(action) {
        yield put(placingOrderInit())
        // here we pass the current logged user to the firebase
        try {
            const {token,userId}=yield select(getCredentials)
            action.orderData.userId=userId
            yield all([
                axios.post(`/orders.json?auth=${token}`,action.orderData),
                put(placingOrderSuccess()),
                put(resetPrice()),
            ])
        } catch (error) {
            yield put(placingOrderFail(error.message))
        }
       
}