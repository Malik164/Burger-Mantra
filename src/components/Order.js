const Order = ({ order:{ingredients,customer,price} }) => {
    const IngredientsArray=[]
    let count=0
    for (const key in ingredients) {
        // if skip ingridient who's quantity is 0
        // if (ingredients[key]==='0') {
        //     continue
        // }
        count++;
        IngredientsArray.push(
            <tr key={key+'fxx'+count}>
                        <td>{count}</td>
                        <td>{key}</td>
                        <td>{ingredients[key]}</td>
            </tr>
        )
    }
    return (
        <div className="card  p-1  h-100 shadow rounded mw-100vw mb-3 card-responsive">
            <h5 className="text-center bg-success text-light rounded p-1">Order Details: {price.toFixed(2)}$</h5>
            <table className="table table-striped table-hover table-responsive">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ingredient:</th>
                        <th>Quantity:</th>
                    </tr>
                </thead>
                <tbody>
                    {IngredientsArray}
                </tbody>
            </table>
            <h5 className="text-center bg-info p-1 text-light">Customer Details</h5>
            <div className="row">
                <div className="col-3 d-flex justify-content-center align-items-center">
                    <i className="fa fa-user fa-5x" aria-hidden="true"></i>
                </div>
                <div className="col-9">
                    <p><b>Name:</b> {customer.name}</p>
                    <p><b>Email:</b> {customer.email}</p>
                    <p><b>City:</b> {customer.city}</p>
                </div>
                <div className="col-12">
                <p><b>Delivery:</b> {customer.deliveryMethod} &nbsp;
                <span><b>Payment:</b> {customer.PaymentMethod}</span>
                </p>
                
                    <p><b>Shipping Address:</b> {customer.address}</p>
                </div>
            </div>
        </div>
    )
}
export default Order