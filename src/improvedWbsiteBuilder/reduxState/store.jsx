import { configureStore } from "@reduxjs/toolkit"
import websiteBuilderReducer from "./websiteBuilderSlice"
import canvasReducer from "./canvasSlice"

export const store = configureStore({
    reducer: {
        websiteBuilder: websiteBuilderReducer,
        canvas: canvasReducer,
    },
})
