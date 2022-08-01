import OrderSummary from "../burger/OrderSummary";
import Button from "../Button";

const OrderModal=props=>(
    <>
        <OrderSummary
        ingredients={props.ingredients}
        price={props.price}
        />
        <div className="float-end my-1">
            <Button type="btn-danger bg-danger text-light  mx-1  custom-btn" clicked={props.cancelPurchaseHandler}>
                <i className="fa fa-times fa-lg" aria-hidden="true"></i>
            </Button>
            <Button type="btn-success bg-success text-light  mx-1 custom-btn" clicked={props.continuePurchaseHanlder}>
                <i className="fa fa-check fa-lg" aria-hidden="true"></i>
            </Button>

        </div>
    </>
)

export default OrderModal