import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import authReducer from "./reducers/auth";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: [thunkMiddleware],
});
