// store.ts
import { configureStore } from '@reduxjs/toolkit';
import flightsReducer from './Slices/FlightsSlice';
import cartReducer from './Slices/CartSlice';

const store = configureStore({
  reducer: {
    flights: flightsReducer,
    cart: cartReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;