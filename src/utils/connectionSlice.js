import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connections",
    initialState: null,
    reducers: {
        addConnection: (state, action) => {
            return action.payload;
        },
    },
});

export const {addConnection} = connectionSlice.actions;
export default connectionSlice.reducer; 