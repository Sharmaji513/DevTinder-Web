
import {configureStore} from "@reduxjs/toolkit"
import  useReducer  from "../utils/userSlice";
import feedReducer from '../utils/feedSlice'


const appStore = configureStore({

    reducer: {
        user: useReducer,
        feed: feedReducer,
        
    }
})

export default appStore;