import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

import {
  TypedUseSelectorHook,
  useDispatch as useDispatchHook,
  useSelector as useSelectorHook
} from 'react-redux';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = useDispatchHook;

export const useSelector: TypedUseSelectorHook<RootState> = useSelectorHook;

export default store;
