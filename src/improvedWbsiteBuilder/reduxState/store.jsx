import { configureStore } from '@reduxjs/toolkit';
import websiteBuilderReducer from './websiteBuilderSlice';
import canvasReducer from './canvasSlice';
import containerStyleReducer from './containerStyleSlice';

export const store = configureStore({
  reducer: {
    websiteBuilder: websiteBuilderReducer,
    canvas: canvasReducer,
    containerStyle: containerStyleReducer,
  },
});
