import { createSlice } from "@reduxjs/toolkit";

const SaveForLaterJobSlice = createSlice({
    name: 'saveForLater',
    initialState: {
        AllSaveForLater: [],
    },
    reducers: {
        //actions
        setAllSaveForLater:(state,action) => {
            state.AllSaveForLater = action.payload;
        },
    }
})

export const {setAllSaveForLater} = SaveForLaterJobSlice.actions;
export default SaveForLaterJobSlice.reducer;