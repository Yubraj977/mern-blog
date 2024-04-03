import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice.js';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
  key: 'root',
  storage, // Corrected
  version: 1
};

const rootReducer = combineReducers({
  user: userReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => // Corrected function name
    getDefaultMiddleware({ serializableCheck: false }) // Returning modified middleware
});

export const persistor = persistStore(store);
