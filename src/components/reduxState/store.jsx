// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import componentReducer from './getComponents'

export const store = configureStore({
    reducer: {
        component: componentReducer
    },
});
