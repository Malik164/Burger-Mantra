export const updateObject=(oldObject,updateProps)=>{
    return{
        ...oldObject,
        ...updateProps
    }
}

// input value  handler form custom form
export  const checkValidity = (value, validation) => {
    // check if validation exists
    let isValid = true
    if (!validation) return
    // now check for each validation
    if (validation.required) {
        isValid = value.trim() !== '' && isValid
    }
    if (validation.minLength) {
        isValid = value.length >= validation.minLength && isValid
    }
    if (validation.maxLength) {
        isValid = value.length <= validation.maxLength && isValid
    }
    if (validation.match) {
        isValid = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value) && isValid
    }
    return isValid
}