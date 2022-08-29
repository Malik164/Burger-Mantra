import Layout from "../layout/Layout";
import "./css/bootstrap.css"
import { Route, Routes } from 'react-router-dom';
import Home from '../layout/Home';
import { AnimatePresence } from 'framer-motion'
// import withRouter from '../components/HOC/withRouter';
import Logout from './auth/Logout';
import { connect } from 'react-redux';
import * as actionCreator from "../store"
import {useLocation} from "react-router"
import { useEffect,Suspense,lazy } from 'react';
import Spinner from "../components/Spinner/Spinner";
const Builder=lazy(()=>import("./Builder"))
const Orders=lazy(()=>import('./Orders'))
const Checkout=lazy(()=>import('./Checkout/Checkout'))
const Auth=lazy(()=>import('./auth/Auth'))
const App=({autoSignIn})=> {
  const location=useLocation()
  useEffect(()=>{
    autoSignIn()
    //eslint-disable-next-line
  },[])
    return (
      <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <>
          <Route path='/' element={<Home />}></Route>
          <Suspense fallback={<Spinner/>}>
              <>
              <Route path='/builder' element={
                <Layout>
                  <Builder />
                </Layout>
              }></Route>
              <Route path='/checkout' element={
                <Layout>
                  <Checkout />
                </Layout>
              }></Route>

              {/* auth link */}
              <Route path='/auth' element={
                <Layout>
                  < Auth/>
                </Layout>
              }></Route>

              <Route path='/orders' element={
                <Layout>
                  <Orders/>
                </Layout>
              }></Route>
              </>
          </Suspense>
          <Route path='/logout' element={<Logout/>} />
        </>
      </Routes>
      </AnimatePresence>
    )
}

const mapDispatchToProps=dispatch=>({
  autoSignIn:()=>dispatch(actionCreator.autoSignIn())
})
export default connect(null,mapDispatchToProps)(App)