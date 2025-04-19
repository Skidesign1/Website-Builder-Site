import { configureStore } from "@reduxjs/toolkit"
import websiteBuilderReducer from "./websiteBuilderSlice"

export const store = configureStore({
    reducer: {
        websiteBuilder: websiteBuilderReducer,
    },
})
