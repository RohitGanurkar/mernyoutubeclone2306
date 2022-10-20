import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accesstoken: null
}

export const data = createSlice({
    name: 'data',
    initialState,
    reducers: {
      setToken: (state,action) => {
        state.accesstoken = action.payload
      }
    },
  });
  
  export const { setToken } =
    data.actions;
  
  export default data.reducer;