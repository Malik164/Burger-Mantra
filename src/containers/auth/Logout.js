import { useEffect } from "react"
import { connect } from "react-redux"
import { Navigate } from "react-router"
import * as actionCreator from "../../store"

const Logout=({onSignOut})=>{
    useEffect(()=>{
        onSignOut()
        //eslint-disable-next-line
    },[])
    return(
        <Navigate to='/auth' />
    )
}
const mapDispatchToProps=dispatch=>({
    onSignOut:()=>dispatch(actionCreator.clearStorage())
})
export default connect(null,mapDispatchToProps)(Logout)