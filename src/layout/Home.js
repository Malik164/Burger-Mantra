import { Link } from "react-router-dom"
import { motion } from "framer-motion"
const Home = props => (
    <motion.main className="main-bg"
    style={{"backgroundImage":`url(${process.env.PUBLIC_URL}'/images/main-bg.jpg')`}}
    initial={{  scale: 1.4 }}
    animate={{  scale: 1, transitionDuration: 3 }}
    transition={{when:"beforeChildren",delayChildren:0.5}}
    exit={{scale:1.4,opacity:0}}
    >
    <div className=" vh-100">
            <div className="col-expand h-100 ">
            <motion.div
            initial={{ opacity: 0, scale: 1.4 }}
            animate={{ opacity: 1, scale: 1, transitionDuration: 1}}
            className="d-flex w-100 h-100 justify-content-center align-items-center">
            <div className="jumbotron  ps-3 text-warning">
                <motion.h5 className=" display-4 text-warning main-title  "
                 initial={{ opacity: 0, y: "-100vh" }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{delay:0.5,duration:2,type:"spring",stiffness:70}}
                >
                <span className="p-0  m-0">Burger</span> Mantra
            
                </motion.h5>
                <p className="display-5 mb-1  text-success" style={{"fontFamily":"Poppins"}}>Build Burger with desired ingredients!</p>
                <p className="text-light">Yo Burgers Yo is a project made using react technology with Firebase,React Router,Redux, Redux Thunk</p>
                <motion.p
                    initial={{ opacity: 0, x: "-100vw" }}
                    animate={{
                        opacity: 1, x: 0,
                        transition:{
                            delay:.5,
                            type:"spring",
                            stiffness:150
                        }
                    }}
                    className="lead">
                    
                            <Link className="btn btn-outline-warning btn-lg" to="/builder" role="button">

                            Build Burger
                            </Link>
                </motion.p>
            </div>
        </motion.div>
            </div>
        </div>
        
    </motion.main>
)
export default Home