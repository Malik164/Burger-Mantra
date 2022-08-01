import Button from "./Button"
import pic from "../assets/cash-on-delivery.png"

import GooglePayment from "./GooglePayment/GooglePayment"
import { motion } from "framer-motion"
const containerVariants={
    hidden:{
        scale:0.8,
        opacity:0,
        transition:{
            delay:0.5, 
        }
    },
    visible:{
        scale:1,
        opacity:1
    }
}
const PaymentMethod = props => {
    return (
        <div className="row my-2 px-4 px-lg-1 justify-content-md-center g-1 text-center"
            
        >
            <h5 className="text-center ">
                <span className="position-relative">
                <span className="display-6">Select Payment Method</span>
                <span className="position-absolute top-0 start-100  badge border border-secondary  badge-sm rounded-pill bg-success" 
                style={{
                    "transform":"translate(-38px, -113%) rotate(20deg)"
                }}
                >
                    {props.price.toFixed(2)}$
                </span>

                </span>
            </h5>
            <motion.div className="col-sm-5 m-1   custom-border"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            >
                <div>
                    <h3>Google Pay</h3>
                    <div className="my-5">
                       
                        <GooglePayment
                            paymentErrorHandler={props.paymentErrorHandler}
                            paymentCancelHandler={props.paymentCancelHandler}
                            paidHandler={props.paidHandler}
                            price={props.price.toString()}
                        />

                    </div>
                    <div className="me-2">
                        <p className="float-end">
                        <i className={`fa fa-check-circle ${props.method==="Paid with Google Pay"?'text-success':''} fa-2x custom-icon`} aria-hidden="true"></i>
                            
                        </p>
                    </div>
                </div>
            </motion.div>
            <div className="col-sm-5 m-1  custom-border "
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                onClick={props.methodSelected}
            >
                <div>
                    <h3>Cash on Delivery</h3>
                    <img width="150" height="150" src={pic} alt="cash on delivery" />
                    <div className="me-2">
                        <p className="float-end">
                            <i className={`fa fa-check-circle ${props.method==="Cash On Delivery"?'text-success':''} fa-2x custom-icon`} aria-hidden="true"></i>

                        </p>
                    </div>
                </div>
            </div>

            <motion.div className="button-row text-center"
            initial={{
                opacity:0,
                y:100
            }}
            animate={{
                opacity:1,
                y:0
            }}
            
            >
                <Button
                    clicked={props.previousStepHanlder}
                    type="secondary mx-2 my-2"
                >
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                </Button>
                <Button
                    clicked={props.postReqHandler}
                    type="success bg-success text-light mx-2 my-2"
                >
                    Place Order
                    <i className="fa fa-shopping-card" aria-hidden="true"></i>
                </Button>

            </motion.div>

        </div>
    )
}

export default PaymentMethod