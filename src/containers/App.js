import React, { Component } from 'react'
import Layout from "../layout/Layout";
import "./css/bootstrap.css"
import Builder from "./Builder";
import { Route, Routes } from 'react-router-dom';
import Home from '../layout/Home';
import Checkout from './Checkout/Checkout';
import Orders from './Orders';
import Auth from './auth/Auth';
import { AnimatePresence } from 'framer-motion'
import withRouter from '../components/HOC/withRouter';
import Logout from './auth/Logout';
class App extends Component {

  render() {
    return (
      <AnimatePresence exitBeforeEnter>
      <Routes key={this.props.location.pathname} location={this.props.location}>
        <>
          <Route path='/' element={<Home />}></Route>
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

          <Route path='/logout' element={<Logout/>} />
        </>
      </Routes>
      </AnimatePresence>
    )
  }
}


export default withRouter(App)