import { configureStore } from "@reduxjs/toolkit"
import containersReducer from "./containersSlice"

export const store = configureStore({
  reducer: {
    containers: containersReducer,
  },
})

