
import {configureStore} from "@reduxjs/toolkit"
import  useReducer  from "../utils/userSlice";


const appStore = configureStore({

    reducer: {
        user: useReducer,
        
    }
})

export default appStore;