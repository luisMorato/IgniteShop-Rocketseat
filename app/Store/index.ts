import { configureStore } from "@reduxjs/toolkit";
import {
    useSelector,
    TypedUseSelectorHook,
    useDispatch
} from "react-redux";

import { cart } from "./Slices/cart";
import { productsReducer } from "./Slices/Products";

export const store = configureStore({
    reducer: {
        cart,
        productsReducer
    }
});

export type rootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<rootState> = useSelector;

export type appDispatch = typeof store.dispatch;
export const useAppDispatch: () => appDispatch = useDispatch;