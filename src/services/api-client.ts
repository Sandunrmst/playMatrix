
import axios from "axios";

export default axios.create({
    baseURL:'https://api.rawg.io/api', 
    params:{
        key:'e74650c012a549fcbf43fe52baaa67c9x'
    }
})