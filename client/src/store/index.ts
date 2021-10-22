import { configureStore } from '@reduxjs/toolkit';
import rootReducer from 'store/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }), // RTK by default doesn't allow to store store and serializable value
});
