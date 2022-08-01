import cheese from "../../../assets/cheese.png";
import beef from "../../../assets/beaf.png";
import tomato from "../../../assets/tomato.png";
import onion from "../../../assets/onion.png";
import lettuce from "../../../assets/lettuce.png";
import Control from "./Control";
import { motion } from "framer-motion";

const Controls = (props) => {
  const wrapper={
    show:{
      opacity:1,
      x:0,
      transition:{
        delay:0.3,
        type:"spring",
        stiffness:300,
        staggerChildren: 0.5
      }
    },
    hidden:{
      opacity:0,
      x:100
    }
  }

  return (
    <div className="col-md-6">
      <h2 className="bg-success text-light text-center rounded">Ingredients</h2>
      <motion.div className="element-wrapper"
      variants={wrapper}
      initial="hidden"
      animate="show"

      >
        <Control
          img={cheese}
          label={"Cheese"}
          count={props.ingredients["cheese"]}
          price={
            props.priceInfo.filter((elm) => elm.label === "cheese")[0].cost
          }
          addIngredientHandler={props.addIngredientHandler}
        />
        <Control
          img={lettuce}
          label={"Lettuce"}
          count={props.ingredients["lettuce"]}
          price={
            props.priceInfo.filter((elm) => elm.label === "lettuce")[0].cost
          }
          addIngredientHandler={props.addIngredientHandler}
        />
        <Control
          img={beef}
          label={"Beef"}
          count={props.ingredients["beef"]}
          price={props.priceInfo.filter((elm) => elm.label === "beef")[0].cost}
          addIngredientHandler={props.addIngredientHandler}
        />
        <Control
          img={tomato}
          label={"Tomato"}
          count={props.ingredients["tomato"]}
          price={
            props.priceInfo.filter((elm) => elm.label === "tomato")[0].cost
          }
          addIngredientHandler={props.addIngredientHandler}
        />
        <Control
          img={onion}
          label={"Onion"}
          count={props.ingredients["onion"]}
          price={props.priceInfo.filter((elm) => elm.label === "onion")[0].cost}
          addIngredientHandler={props.addIngredientHandler}
        />
      </motion.div>
    </div>
  );
};

export default Controls;
