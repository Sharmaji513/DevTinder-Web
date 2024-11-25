
import {configureStore} from "@reduxjs/toolkit"
import  useReducer  from "../utils/userSlice";
import feedReducer from '../utils/feedSlice'
import connectionReducer from "../utils/connectionSlice";
import requestReducer from "../utils/requestSlice";


const appStore = configureStore({

    reducer: {
        user: useReducer,
        feed: feedReducer,
        connections: connectionReducer,
        request: requestReducer
        
    }
})

export default appStore;