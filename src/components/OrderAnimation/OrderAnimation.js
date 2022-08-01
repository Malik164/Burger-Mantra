
import "./order.css"
const OrderAnimation = props => (
    <div className="container p-2 d-flex cover-wrapper">
        <div className="cover">

            <div className="main">
                <div className="road"  >
                    <ul className="list-ul">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <div className="bus">
                        <div className="back">
                            <div className="back1door"></div>
                            <div className="back2door"></div>
                            <div className="join"></div>
                        </div>
                        <div className="front">
                            <div className="black"></div>
                            <div className="light1"></div>
                            <div className="light2"></div>
                        </div>
                    </div>
                    <div className="gift"></div>
                </div>
            </div>
        </div>
        <h5 className="mt-2">Placing Your Order....</h5>

    </div>
)

export default OrderAnimation