import { Component } from "react"
import BackDrop from "../modal/BackDrop"
import Spinner from "../Spinner/Spinner"
const withErrorHandler = (WrappedComponent, axios,url) => {
    return class extends Component {
        state = {
            error: null,
            response: null,
            loading:true,
            confirmError:false
        }
        componentDidMount() {
            // axios inspector error handler
            // register the inspector
        // fetch the request
        axios.get(url).then(response=>{
            this.setState({
                error:null,
                response,
                loading:false
            })
        }).catch(e=>{
            this.setState({
                error:e.message,
                loading:false,
                confirmError:true
            })
        })
            
        }
        confimErrorHanlder = () => {
            this.setState({ confirmError:false})
        }
        render() {
            if (this.state.loading) {
                return (
                    <div className="vh-100 vw-100 text-center d-flex align-items-center">
                        <Spinner/>
                    </div>
                )
            }
            return (
                <>
                    <BackDrop
                    show={this.state.confirmError}
                    modalClosed={this.confimErrorHanlder}
                    >
                        <div className="text-center my-3">
                            <div className="text-danger">
                                <i className="fa fa-exclamation-circle fa-5x" aria-hidden="true"></i>
                                <h5>{this.state.error}</h5>
                            </div>
                        </div>
                    </BackDrop>
                    {this.state.error?
                    <div className="alert alert-danger my-5 w-50 mx-auto text-light" role="alert">
                    <h3 className="alert-heading">Oops!
                    <span className="float-end">
                    <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>

                    </span>
                    </h3>
                    <p>{this.state.error}</p>
                    <hr/>
                    <small className="mb-0">Something Went Wrong! Please Try again Later!</small>
                  </div>:
                    <WrappedComponent {...this.props} response={this.state.response}/>
                    }
                </>

            )
        }
    }
}

export default withErrorHandler


/**
 * if (this.state.error) {
       modalElm=
     }
 */