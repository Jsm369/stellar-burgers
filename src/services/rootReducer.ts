import { combineReducers } from '@reduxjs/toolkit';
import {
  userSlice,
  ingredientsSlice,
  ordersSlice,
  newOrderSlice,
  feedsSlice,
  burgerConstructorSlice
} from '@slices';

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  ingredients: ingredientsSlice.reducer,
  orders: ordersSlice.reducer,
  newOrder: newOrderSlice.reducer,
  feeds: feedsSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer
});
