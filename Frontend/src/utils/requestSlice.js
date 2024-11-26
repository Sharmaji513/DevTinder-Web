import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,

    removeRequest: (state, action) => {
      // console.log("Current State:", state);
      // console.log("payload" , action.payload); 

      const newArray = state.filter((r) =>{
         r._id !== action.payload
        });
      
      // console.log("Updated State:", newArray);
      return newArray;
  },
  },
});

export const { addRequests , removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
