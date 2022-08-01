import Button from "../../components/Button"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import CustomeForm from "../../components/Form/CustomerForm"
import { connect } from "react-redux/es/exports"
import Spinner from "../../components/Spinner/Spinner"
import BackDrop from "../../components/modal/BackDrop"
import * as actionsCreator from "../../store"
// showing alert messages
import { Navigate } from "react-router"
import { checkValidity } from "../../store/utility"


const formVariants = {
    hidden: {
        opacity: 0,
        x: "100vw",
    },
    visible: {
        opacity: 1,
        x: 0,
    }
}
const Auth = props => {


    const [formData, setFormData] = useState({

        email: {
            inputType: 'input',
            label: 'Your Email Address:',
            feedback: 'Enter a valid email adresss',
            value: '',
            config: {
                type: 'email',
                placeholder: 'type your email address',
                required: true

            },
            valid: false,
            touched: false,
            validity: {
                required: true,
                minLength: 5,
                match: true
            }
        },
        password: {
            inputType: 'input',
            label: 'Password',
            feedback: 'Minimum length should be 6 Characters!',
            value: '',
            config: {
                type: 'password',
                placeholder: 'type your password',
                required: true

            },
            valid: false,
            touched: false,
            validity: {
                required: true,
                minLength: 6,
            }
        },


    })
    // change input hadnler
    const inputChangeHandler = (event, targetElm) => {
        // just update the value of form element targeted by user
        let value = event.target.value
        const updatedForm = { ...formData }
        const updatedFormElm = { ...updatedForm[targetElm] }
        // now change the value of that input element
        updatedFormElm.value = value
        updatedFormElm.valid = checkValidity(updatedFormElm.value, updatedFormElm.validity)
        updatedFormElm.touched = true
        updatedForm[targetElm] = updatedFormElm
        // now update the state
        setFormData(updatedForm)
    }
   
    const [isSignUp, setisSignUp] = useState(true)
    const showSignInHanlder = () => {
        setisSignUp(false)
    }
    const hideSignInHanlder = () => {
        setisSignUp(true)
    }
    useEffect(() => {

        // make the form blank
        let toUpdateForm = { ...formData }
        toUpdateForm = {
            ...formData,
            email: {
                ...formData.email,
                value: '',
                touched: false
            },
            password: {
                ...formData.password,
                value: '',
                touched: false
            }
        }
        setFormData(toUpdateForm)
        //eslint-disable-next-line
    }, [isSignUp])


    // form submission handler
    const onSubmisson = e => {
        e.preventDefault()
        let userData = {}
        for (const key in formData) {
            userData[key] = formData[key].value
        }
        // pass the option
        userData.returnSecureToken=true
        props.onFormSubmission(isSignUp, userData)
    }









    let authComponent = (<div className=" bg-secondary rounded shadow-lg px-4 pb-3 mt-5  mx-auto " style={{ width: "95%", maxWidth: "40rem" }}


    >
        <motion.div className="justify-content-center button-row d-flex flex-md-row flex-column text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, staggerChildren: 0.5 }}


        >
            <Button
                type={`primary ${isSignUp && 'bg-primary text-light'} px-1 px-md-5  m-4  rounded`}
                clicked={hideSignInHanlder}
            >
               Switch to Sign Up
            </Button>
            <Button
                type={`primary ${!isSignUp && 'bg-success text-light'} m-4  px-1 px-md-5 rounded`}
                clicked={showSignInHanlder}
            >
                Switch to Sign In
            </Button>
        </motion.div>
        {isSignUp && (
            <motion.div
                variants={formVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
            >
                <h2>Create New Account</h2>
                <form action="" className="my-2 w-100 ">
                    <CustomeForm
                        formData={formData}
                        inputChangeHandler={inputChangeHandler}
                    />
                    <Button type="success rounded bg-primary text-light mt-2"
                        clicked={onSubmisson}
                    >
                        Submit
                    </Button>
                </form>
            </motion.div>
        )}
        {!isSignUp && (
            <motion.div
                variants={formVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
            >
                <h2 >Welcome Back!</h2>
                <form action="" className="my-2 w-100 ">
                    <CustomeForm
                        formData={formData}
                        inputChangeHandler={inputChangeHandler}
                    />
                    <Button type="success rounded bg-success text-light mt-2"
                        clicked={onSubmisson}
                    >

                        Submit
                    </Button>
                </form>
            </motion.div>
        )}
    </div>)


        // while loading
        if (props.auth.loading) {
            authComponent = (
                <div className="my-5 text-center">
                    <Spinner />
                </div>
            )
        }
    
    // if user is authenticated then redirect to builder page
    if (props.isAuthenticated) {
        authComponent=(
            <Navigate to={props.building?'/checkout':'/builder'}/>
        )
    }


    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
        >
            
            <div className="container py-3" style={{ paddingLeft: "70px" }}

                transition={{ duration: 0.5, when: "beforeChildren", type: "spring", staggerChildren: 0.5, delayChildren: 2 }}
            >
                {authComponent}

            </div>
            <BackDrop
                show={props.auth.error}
                modalClosed={props.modalClosed}
            >
                <div className="text-center my-3">
                    <div className="text-danger">
                        <i className="fa fa-exclamation-circle fa-5x" aria-hidden="true"></i>
                        <h5>{props.auth.error}</h5>
                    </div>
                </div>
            </BackDrop>
        </motion.div>
    )
}

// map state to  prosp
const mapStateToProps = state => ({
    auth: state.auth,
    isAuthenticated:state.auth.token !==null,
    building:state.burger.building
})

// map action to props
const mapDispatchToProps = dispatch => ({
    onFormSubmission: (isSignUp, userData) => dispatch(actionsCreator.asyncAuthHandler(isSignUp, userData)),
    modalClosed: () => dispatch(actionsCreator.authErrorNoticed())
})
export default connect(mapStateToProps, mapDispatchToProps)(Auth)