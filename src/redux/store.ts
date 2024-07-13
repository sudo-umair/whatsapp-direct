import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './userReducer';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'savedNumbers'],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
