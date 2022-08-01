import * as actionTypes from "../actionTypes"
import axios from "../../components/OrderAxios/OrderAxios"
import {resetPrice} from "../actions/builder"

///------------- placing order---------------------
export const placingOrderInit=()=>({
    type:actionTypes.PLACE_ORDER_INIT
})

export const placingOrderSuccess=()=>({
    type:actionTypes.PLACE_ORDER_SUCCESS,
    // orderData
})

export const placingOrderFail=(error)=>({
    type:actionTypes.PLACE_ORDER_FAILED,
    error
})
export const purchasingInit=()=>({
    type:actionTypes.PURCHASE_INIT,
})

//-- placing the order asynchronusly----------
export const placingOrderAsync=(orderData)=>{
    return (dispatch,getState)=>{
        dispatch(placingOrderInit())
        const {auth:{token,userId}}=getState()
        // here we pass the current logged user to the firebase
        orderData.userId=userId
        axios.post(`/orders.json?auth=${token}`,orderData).then(res=>{
        dispatch(placingOrderSuccess())
        dispatch(resetPrice())
    }).catch(e=>{
        dispatch(placingOrderFail(e.message))
    })
}
}

export const errorNoticed=()=>({type:actionTypes.ERROR_NOTICED})


export const fethOrderInit=()=>({
    type:actionTypes.FETCH_ORDER_INIT
})
export const fetchOrderSuccess=(orders)=>({
    type:actionTypes.FETCH_ORDER_SUCCESSS,
    orders
})
export const fetchOrderFail=(error)=>({
    type:actionTypes.FETCH_ORDER_FAILED,
    error
})
// fetching order asynchronusly
export const fetchOrderAsync=()=> (dispatch,getState)=>{
    dispatch(fethOrderInit())
    let {auth:{token,userId}}=getState()
    axios.get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`).then((response)=>{
        if (response.data) {
            
            const orders= Object.keys(response.data).map(key =>response.data[key])
            return dispatch(fetchOrderSuccess(orders))
        }
        
        dispatch(fetchOrderSuccess([]))
    }).catch(e=>{
        console.log(e);
        dispatch(fetchOrderFail(e.message))
    })
}