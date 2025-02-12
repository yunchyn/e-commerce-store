import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { persistedSessionReducer } from "./sessionSlice";

export const store = configureStore({
  reducer: {
    session: persistedSessionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 직렬화 에러 방지
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
