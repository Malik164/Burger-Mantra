import * as actionTypes from "../actionTypes"

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
   return{
        type:actionTypes.PLACE_ORDER_START,
        orderData
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
export const fetchOrderAsync=()=>({
    type:actionTypes.FETCH_ORDER_START
})