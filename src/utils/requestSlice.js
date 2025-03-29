import { createSlice } from "@reduxjs/toolkit";

const RequestSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        addRequest: (state, action) => {
            return action.payload;
        },
        removeUserFromRequest: (state, action) => {
            const newRequests = state.filter((state) => state._id !== action.payload);
            return newRequests;
        }
    },
});

export const {addRequest, removeUserFromRequest} = RequestSlice.actions;
export default RequestSlice.reducer;