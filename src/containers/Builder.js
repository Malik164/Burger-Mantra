import Burger from "../components/burger/Burger";
import Controls from "../components/burger/controls/Controls";
import BackDrop from "../components/modal/BackDrop";
import OrderModal from "../components/modal/OrderModal";
import Spinner from "../components/Spinner/Spinner";
import { connect } from "react-redux"
import * as actionCreator from "../store/index"
import { motion } from "framer-motion"
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
// price info will handle the price of each ingredients of burger
const priceInfo = [
  {
    label: "lettuce",
    cost: 0.4,
  },
  {
    label: "beef",
    cost: 2.3,
  },
  {
    label: "onion",
    cost: 0.1,
  },
  {
    label: "tomato",
    cost: 0.3,
  },
  {
    label: "cheese",
    cost: 0.7,
  },
];


const Builder = props => {
  const [purchasing, setPurchasing] = useState(false)
  const navigate=useNavigate()
  useEffect(() => {
    props.fetchIngredientsAsync()
    props.resetPrice()
    props.purchasingInit()
    // eslint-disable-next-line 
  }, [])
  // function that show model
  const setPurchaseHandler = () => {
    setPurchasing(true)
  };
  const cancelPurchaseHandler = () => {
    setPurchasing(false)
  };

  // continue purchase handler
  const continuePurchaseHanlder = (event) => {
    event.stopPropagation()
    // now navigate to checkout page
    // if user is not authenticated then
    if (!props.isAuthenticated) {
      navigate('/auth')
      return
    }
    navigate('/checkout')

  }

  // framer motion container animation vairants

    let burgerElm = (
      <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
        <Spinner />
      </div>)
    if (props.error) {
      burgerElm = (
        <div className="alert alert-danger w-50 mx-auto my-5  text-light text-center" role="alert">
          <h2 className="text-light">
            <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
          </h2>
          <h5 className="text-light">{props.error}</h5>
          <hr />
          <p className="mb-0">Something Went wrong, Please Try Later...</p>
        </div>)
    }
    if (props.ings) {
      burgerElm = (
        <div>
          <motion.div className="content"
            initial={{ opacity: 0, x: "100vw" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ x: "100vw" }}
            transition={{ duration: 0.5, when: "beforeChildren", type: "spring", delayChildren: 0.5 }}
          >
            <div className="row g-3 px-1">
              <Burger
                ingredients={props.ings}
                price={props.price}
                setPurchaseHandler={setPurchaseHandler}
                isAuthenticated={props.isAuthenticated}

              />
              <Controls
                ingredients={props.ings}
                addIngredientHandler={props.ingredientChangeHandler}
                priceInfo={priceInfo}
              />

            </div>
          </motion.div>

          <BackDrop
            show={purchasing}
            modalClosed={cancelPurchaseHandler}
          >
            <OrderModal
              ingredients={props.ings}
              continuePurchaseHanlder={continuePurchaseHanlder}
              cancelPurchaseHandler={cancelPurchaseHandler}
              price={props.price}
            />
          </BackDrop>
        </div>
      )
    }

    return (
      <>
        {burgerElm}
      </>
    );
}


// map state to props
const mapStateToProps = state => {
  return {
    ings: state.burger.ingriedients,
    price: state.burger.totalPrice,
    error: state.burger.error,
    isAuthenticated: state.auth.token !== null
  }
}


const mapDispatchToProps = dispatch => {
  return {
    ingredientChangeHandler: (ingredient, kind) => dispatch(actionCreator.changeIngredient(ingredient, kind)),
    fetchIngredientsAsync: () => dispatch(actionCreator.fetchIngredientsAsync()),
    resetPrice: () => dispatch(actionCreator.resetPrice()),
    purchasingInit: () => dispatch(actionCreator.purchasingInit()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Builder)
