
import {configureStore} from "@reduxjs/toolkit"
import  useReducer  from "../utils/userSlice";
import feedReducer from '../utils/feedSlice'
import connectionReducer from "../utils/connectionSlice";


const appStore = configureStore({

    reducer: {
        user: useReducer,
        feed: feedReducer,
        connections: connectionReducer,
        
    }
})

export default appStore;