import Input from "./Input"
const CustomeForm = props => {
    // convert the receiving object to array  so that I can map them
    let formDataArr=[]
    for (const key in props.formData) {
        formDataArr.push({
            id:key,
            ...props.formData[key]
        })
    }
    return (
        <>
                {formDataArr.map(elm=>(
                    <Input
                    key={elm.id}
                    inputType={elm.inputType}
                    config={elm.config}
                    label={elm.label}
                    value={elm.value}
                    valid={elm.valid}
                    touched={elm.touched}
                    feedback={elm.feedback}
                    inputChanged={(event)=>{props.inputChangeHandler(event,elm.id)}}
                    />
                ))}
               
                

        </>

    )
}

export default CustomeForm