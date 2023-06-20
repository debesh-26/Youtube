import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import videoReducer from "./videoSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({ user: userReducer, video: videoReducer }); // Combine all of our reducers together

const persistedReducer = persistReducer(persistConfig, rootReducer); // Create a new reducer with our existing reducer

export const store = configureStore({
  reducer: persistedReducer, // Use our new persisted reducer
  middleware: (getDefaultMiddleware) => // Add the redux-persist middleware
    getDefaultMiddleware({ 
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store) // Create a persistor object