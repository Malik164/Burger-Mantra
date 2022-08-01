import { motion } from "framer-motion"
import { useEffect } from "react"
import Order from "../components/Order"
import Spinner from "../components/Spinner/Spinner"
import * as actionCreator from "../store"
import { connect } from "react-redux"
import BackDrop from "../components/modal/BackDrop"
import { useState } from "react"
import { Navigate } from "react-router"

const Orders = props => {
    const [err,setErr]=useState()
    useEffect(()=>{
        props.fetchOrderAsync()
        //eslint-disable-next-line
    },[])

    useEffect(()=>{
        setErr(props.error)
    },[props.error])

    const modalCloseHandler=()=>{
        setErr(false)
    }
    // convert the object of objects to arrays of objects
    
    let OrderElm =<div className="my-5 d-flex justify-content-center"><Spinner/></div> 

    // if user is not authnticated
    if (!props.isAuthenticated) {
        OrderElm=<Navigate to="/auth"/>
    }


    if (!props.loading && props.orders?.length===0) {
        OrderElm=<h1>No Order's found!</h1>
    }
    if (!props.loading && props.orders?.length) {
        OrderElm = <>
        {props.orders.map((order, i) => (
            <div className="col-md-6 col-lg-4 " key={`fxx${i}`}
            >
                <Order
                    order={order}
                />
            </div>
        ))}
    </>
    }
    if (props.error) {
        OrderElm=<div className="alert alert-danger my-5 w-50 mx-auto text-light" role="alert">
                    <h3 className="alert-heading">Oops!
                    <span className="float-end">
                    <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>

                    </span>
                    </h3>
                    <p>{props.error}</p>
                    <hr/>
                    <small className="mb-0">Something Went Wrong! Please Try again Later!</small>
                  </div>
       
    }

    return (
    <motion.div
    initial={{ opacity: 0,y:"-100vh" }}
    animate={{ opacity: 1 ,y:0}}
    exit={{ opacity: 0 }}
    transition={{ duration:0.5,when:"beforeChildren" }}

    >
        <div className="container my-2 " style={{"paddingLeft":"54px"}}>
            <div className="w-50 mx-auto">
                <motion.h2
                    initial={{ y: "-100vh" }}
                    animate={{ y: 0 }}
                    transition={{delay:2}}
                    className="text-center my-2 bg-info text-light rounded-pill shadow p-2">Orders
                    &nbsp;
                    <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                </motion.h2>

            </div>
            <div className="row g-1 my-2 mb-5 px-3 px-lg-1"  style={{"maxWidth":"95%","marginInline":"auto"}} >
            {OrderElm}
            </div>
        </div>
        <BackDrop
                    show={err}
                    modalClosed={modalCloseHandler}
                    >
                        <div className="text-center my-3">
                            <div className="text-danger">
                                <i className="fa fa-exclamation-circle fa-5x" aria-hidden="true"></i>
                                <h5>{props.error}</h5>
                            </div>
                        </div>
                    </BackDrop>
        </motion.div>     
    )
}


const mapStateToProps=state=>{
    return{
        loading:state.orders.loading,
        error:state.orders.error,
        orders:state.orders.orders,
        isAuthenticated:state.auth.token!==null
    }
}
const mapDispatchToProps=(dispatch)=>({
    fetchOrderAsync:()=>dispatch(actionCreator.fetchOrderAsync()),
    errorNoticed:()=>dispatch(actionCreator.errorNoticed())
})


export default connect(mapStateToProps,mapDispatchToProps)(Orders)