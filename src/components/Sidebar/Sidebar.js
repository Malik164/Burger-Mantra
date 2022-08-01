import logo from "../../assets/logo.png"
import { createRef } from "react"
import { Link, NavLink } from "react-router-dom"
import {connect}  from "react-redux"
import * as actionCreator from "../../store"
export const Sidebar=props=>{
  const menuElm=createRef()
  const clickHanlder=()=>{
    menuElm.current.classList.toggle('open')
  }
    return(
        <>
        <div className="wrapper">
        
        <aside className="sidebar  bg-light" data-sidebar ref={menuElm}>
        <button className="menu-icon-btn text-center" data-menu-icon-btn onClick={clickHanlder}>
          <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="menu-icon"><g ><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></g></svg>
        </button>
          <div className="top-sidebar">
            <Link to="/" className="channel-logo text-center ">
              
              <img src={logo} alt="Burger Builder" />
            </Link>
            <h5 className="hidden-sidebar your-channel">Burger Builder</h5>
            <div className="hidden-sidebar channel-name">Make Delicious Burger with desired ingredients</div>
          </div>
          <div className="bottom-sidebar">
            <ul className="sidebar-list">
              <li className="sidebar-list-item">
                <NavLink to="/builder" className="sidebar-link">
                  <div className="sidebar-icon">
                    <i className="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i> 
                  </div>
                  <div className="hidden-sidebar">Build</div>
                </NavLink>
              </li>
              <li className="sidebar-list-item">
                <NavLink to="/checkout" className="sidebar-link">
                  <div className="sidebar-icon">
                    <i className="fa fa-shopping-cart fa-lg" aria-hidden="true"></i> 
                  </div>
                  <div className="hidden-sidebar">CheckOut</div>
                </NavLink>
              </li>
              <li className="sidebar-list-item">
                <NavLink to="/orders" className="sidebar-link">
                  <div className="sidebar-icon">
                    <i className="fa fa-shopping-basket fa-lg" aria-hidden="true"></i> 
                  </div>
                  <div className="hidden-sidebar">Orders</div>
                </NavLink>
              </li>
              {/* account link */}
              <li className="sidebar-list-item">
                  {!props.auth.token?(
                    <NavLink to="/auth" className="sidebar-link">
                      <div className="sidebar-icon">
                      <i className="fa fa-user-circle fa-lg" aria-hidden="true"></i>

                      </div>
                      <div className="hidden-sidebar">Account</div>
                    </NavLink>):(
                      <NavLink to="/logout" className="sidebar-link">
                      <div className="sidebar-icon">
                      <i className="fa fa-sign-out fa-lg" aria-hidden="true"></i>

                      </div>
                      <div className="hidden-sidebar">Sign Out</div>
                    </NavLink>)

                  }
                  
              </li>
            </ul>
          </div>
        </aside>
      </div>
      </>

    )
}


// map state to props
const mapStateToProps=state=>({
  auth:state.auth
})
const mapDispatchToProps=(dispatch)=>({
  signOut:()=>dispatch(actionCreator.signOut())
})

export default connect(mapStateToProps,mapDispatchToProps)(Sidebar)
