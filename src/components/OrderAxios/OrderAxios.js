import axios from "axios";

// create instance of axios
const OrderInstance=axios.create({
    baseURL:process.env.REACT_APP_DATABASE_URL
})


export default OrderInstance