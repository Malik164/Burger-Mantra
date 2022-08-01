const OrderSummary = ({ingredients,price}) => {
    const summaryList = Object.keys(ingredients).map((igKey, i) => (
        <tr key={igKey}>
            <td>{i + 1}</td>
            <td>{igKey}</td>
            <td className="text-info"><b>
                    {ingredients[igKey]}
            </b></td>
        </tr>
    ))
    return (
        <div>
            <h5 className="text-light bg-info text-center my-1 py-2">
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                &nbsp;
                CheckOut :&nbsp;&nbsp;
                <b>
                ${price.toFixed(2)}
                </b>
            </h5>
            <div className="table-responsive">
            <table className="table table-striped    table-borderless">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ingredient:</th>
                        <th>Quantity:</th>
                    </tr>
                </thead>
                <tbody>
                    {summaryList}
                </tbody>
            </table>
            </div>
            
        </div>
    )
}
export default OrderSummary