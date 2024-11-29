import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: [],
    reducers:{
        addFeed: (state ,action) =>{
            return action.payload;
        },
        removeFeed: (state,action) =>{
            return null
        }
    }
})


export const { addFeed } = feedSlice.actions;
export default feedSlice.reducer;