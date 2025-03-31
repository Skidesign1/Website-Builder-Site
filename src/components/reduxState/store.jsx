import { configureStore } from "@reduxjs/toolkit";
import canvasSlice from "./containerSlice";

export const store = configureStore({
    reducer: {
        canvas: canvasSlice.reducer,
    },
});

export default store;
