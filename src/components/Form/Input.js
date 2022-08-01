const Input = props => {
    let InputElm = null
    let inputClasses = ['form-control']
    // if element is touched and is invalid
    if (props.touched && !props.valid) {
        inputClasses.push('is-invalid')
    }
    if (props.touched && props.valid) {
        inputClasses.push('is-valid')
    }
    switch (props.inputType) {
        case 'input':
            InputElm = <div className="mb-1">
                <label>{props.label}</label>
                <input value={props.value} onChange={props.inputChanged} className={inputClasses.join(' ')}  {...props.config} />
                <small className="invalid-feedback">{props.feedback}</small>
            </div>
            break;
        case 'textarea':
            InputElm = <div className="mb-1">
                <label>{props.label}</label>
                <textarea value={props.value} onChange={props.inputChanged} className={inputClasses.join(' ')}  {...props.config} />
                <small className="invalid-feedback">{props.feedback}</small>
            </div>
            break;
        case 'select':
            InputElm = <div className="mb-1">
                <label>{props.label}</label>
                <select value={props.value} className="form-select" onChange={props.inputChanged}>
                    {props.config.options.map(option=>(
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select> </div>
            break;


        default:
            InputElm=null
            break;
    }
    return InputElm

}

export default Input