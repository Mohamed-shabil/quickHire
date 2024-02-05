import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import store from './store';

const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default rootReducer;