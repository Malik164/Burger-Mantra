const Control = props => (
    <div className="row bg-secondary rounded p-2 control-line  my-1">
        <div className="col-4 ">
            <div className="w-100  my-auto  h-100 text-center img-box">
                <img src={props.img} alt="bacon" className=" burger-ingrideint"  style={{"boxShadow":"none"}}/>

            </div>
        </div>
        <div className="col-8 d-flex align-item-center justify-content-between">
            <div>
                <h2 className=''>{props.label}</h2>
                <small>{props.label} Price: <b className="text-info">{props.price}$</b></small>

            </div>
            <div className="button-wrapper mx-2 text-center">
                <h2>{props.count}</h2>
                <button className="btn mx-1  btn-sm btn-success bg-success text-light" onClick={()=>props.addIngredientHandler(props.label.toLowerCase(),'plus')}>+</button>
                <button disabled={props.count === 0} onClick={()=>props.addIngredientHandler(props.label.toLowerCase(),'minus')} className="btn mx-1 btn-sm bg-danger text-light btn-danger">-</button>
            </div>
        </div>
    </div>
)

export default Control