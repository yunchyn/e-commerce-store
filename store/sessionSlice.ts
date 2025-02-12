import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

interface UserSession {
  userId: string;
  userName: string;
  profilePic?: string;
  email: string;
  cartCount: number;
}

// 초기 상태
const initialState: UserSession = {
  userId: "",
  userName: "",
  profilePic: undefined,
  email: "",
  cartCount: 0,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<UserSession>) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.profilePic = action.payload.profilePic;
      state.email = action.payload.email;
      state.cartCount = action.payload.cartCount;
    },
    clearSession: (state) => {
      state.userId = "";
      state.userName = "";
      state.profilePic = undefined;
      state.email = "";
      state.cartCount = 0;
    },
  },
});

// actions
export const { setSession, clearSession } = sessionSlice.actions;

// redux-persist 설정 : local storage에 저장
const persistConfig = {
  key: "session",
  storage,
};

export const persistedSessionReducer = persistReducer(persistConfig, sessionSlice.reducer);
