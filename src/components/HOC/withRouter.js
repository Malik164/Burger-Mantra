import { useLocation, useNavigate } from "react-router"
import { useSearchParams } from "react-router-dom"


const withRouter = WrappedComponent => {
    return props => {
        const navigate = useNavigate()
        const location = useLocation()
        const params = useSearchParams()
        return (
        <WrappedComponent navigate={navigate} location={location} params={params} {...props} />
        )
    }
}
export default withRouter