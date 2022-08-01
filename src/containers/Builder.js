import React, { Component } from "react";
import Burger from "../components/burger/Burger";
import Controls from "../components/burger/controls/Controls";
import withRouter from "../components/HOC/withRouter";
import BackDrop from "../components/modal/BackDrop";
import OrderModal from "../components/modal/OrderModal";
import Spinner from "../components/Spinner/Spinner";
import { connect } from "react-redux"
import * as actionCreator from "../store/index"
import {motion} from "framer-motion"
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


class Builder extends Component {
  state = {
    purchasing: false,
  };
  componentDidMount() {
    this.props.fetchIngredientsAsync()
    this.props.resetPrice()
    this.props.purchasingInit()
    this.props.autoSingIn()
  }

  // function that show model
  setPurchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false });
  };

  // continue purchase handler
  continuePurchaseHanlder = (event) => {
    event.stopPropagation()
    // now navigate to checkout page
    // if user is not authenticated then
    if (!this.props.isAuthenticated) {
        this.props.navigate('/auth')
        return
    }

      this.props.navigate('/checkout')
    
  }

  // framer motion container animation vairants

  render() {
    let burgerElm = (
      <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
        <Spinner />
      </div>)
    if (this.props.error) {
      burgerElm = (
        <div className="alert alert-danger w-50 mx-auto my-5  text-light text-center" role="alert">
          <h2 className="text-light">
          <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
          </h2>
          <h5  className="text-light">{this.props.error}</h5>
          <hr />
          <p className="mb-0">Something Went wrong, Please Try Later...</p>
        </div>)
    }
    if (this.props.ings) {
      burgerElm = (
        <div>
          <motion.div className="content"
               initial={{ opacity: 0,x: "100vw" }}
               animate={{ opacity: 1 ,x: 0 }}
               exit={{ x: "100vw" }}
               transition={{ duration:0.5,when:"beforeChildren" ,type:"spring",delayChildren:0.5}}
          >
            <div className="row g-3 px-1">
              <Burger
                ingredients={this.props.ings}
                price={this.props.price}
                setPurchaseHandler={this.setPurchaseHandler}
                isAuthenticated={this.props.isAuthenticated}

              />
              <Controls
                ingredients={this.props.ings}
                addIngredientHandler={this.props.ingredientChangeHandler}
                priceInfo={priceInfo}
              />

            </div>
          </motion.div>

          <BackDrop
            show={this.state.purchasing}
            modalClosed={this.cancelPurchaseHandler}
          >
            <OrderModal
              ingredients={this.props.ings}
              continuePurchaseHanlder={this.continuePurchaseHanlder}
              cancelPurchaseHandler={this.cancelPurchaseHandler}
              price={this.props.price}
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
}


// map state to props
const mapStateToProps = state => {
  return {
    ings: state.burger.ingriedients,
    price: state.burger.totalPrice,
    error: state.burger.error,
    isAuthenticated:state.auth.token!==null
  }
}


const mapDispatchToProps = dispatch => {
  return {
    ingredientChangeHandler: (ingredient, kind) => dispatch(actionCreator.changeIngredient(ingredient, kind)),
    fetchIngredientsAsync: () => dispatch(actionCreator.fetchIngredientsAsync()),
    resetPrice:()=>dispatch(actionCreator.resetPrice()),
    purchasingInit:()=>dispatch(actionCreator.purchasingInit()),
    autoSingIn:()=>dispatch(actionCreator.autoSignIn())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Builder))
