import { useEffect } from "react"
import { connect } from "react-redux"
import { Navigate } from "react-router"
import * as actionCreator from "../../store"

const Logout=(props)=>{
    useEffect(()=>{
        props.onSignOut()
        //eslint-disable-next-line
    },[])
    return(
        <Navigate to='/auth' />
    )
}
const mapDispatchToProps=dispatch=>({
    onSignOut:()=>dispatch(actionCreator.signOut())
})
export default connect(null,mapDispatchToProps)(Logout)