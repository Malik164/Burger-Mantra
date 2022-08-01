
import { motion } from "framer-motion"
import Button from "../Button"
import BurgerArt from "./BurgerArt"
const Burger = props => {
  let count=0
  for (const key in props.ingredients) {
      count+= +props.ingredients[key]
  }
  const wrapper={
    show:{
      opacity:1,
      x:0,
      transition:{
        delay:0.6,
        type:"spring",
        stiffness:300,
        staggerChildren: 0.5
      }
    },
    hidden:{
      opacity:0,
      x:-100
    }
  }
  
  return (
    <div className="col-md-6 text-center">
      <motion.div className="burger-wrapper"
      variants={wrapper}
      initial="hidden"
      animate="show"
      transition={{delay:0.5}}
      >
        <BurgerArt ingredients={props.ingredients}/>

      </motion.div>
      <div className="text-center">
        <Button type="info" 
        isDisabled={count===0}
        clicked={props.setPurchaseHandler}
        >
          <i className="fa fa-shopping-cart" aria-hidden="true"></i> &nbsp;
         {props.isAuthenticated? 'CheckOut':"Sign in to continue"}
          &nbsp;{props.price.toFixed(2)}$
        </Button>
      </div>
    </div>



  )
}
export default Burger