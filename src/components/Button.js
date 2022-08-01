import { motion } from "framer-motion";
// this button can also handle disabled or not
const Button=props=>(
    <motion.button 
    className={`btn btn-${props.type}`}
    whileHover={{
        scale:1.1
    }}
    whileTap={{
        scale:0.9
    }}
    disabled={props.isDisabled}
    onClick={props.clicked}
    >
        {props.children}
    </motion.button>
)
export default Button