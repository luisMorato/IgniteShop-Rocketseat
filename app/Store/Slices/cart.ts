import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rootState } from "..";

import { productProps } from "./Products";
import build from "next/dist/build";

interface cartProductProps {
    product: productProps,
    quantity: number
}

export interface cartProps {
    id: string | null,
    cartProducts: cartProductProps[],
    isLoading: boolean,
}

export const loadExistingCartProducts = createAsyncThunk(
    'cart/load',
    async () => {
        const data = localStorage.getItem('@ignite-shop-1.0.0 - cartProducts');

        if(data) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }
)

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (productId: string, { getState, dispatch }) => {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const { productsReducer } = getState() as rootState;

        const product = productsReducer.products.find(({ id }) => id === productId);

        if(!product) {
            return;
        }

        const data = {
            cartProduct: {
                product,
                quantity: 1
            }
        }

        dispatch(add(data));
    }
);

export const initialState: cartProps = {
    id: String(Math.random() * 10000 + Date.now()),
    cartProducts: [],
    isLoading: false,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action) => {
            const { cartProduct } = action.payload;
            const existingCartProductIndex = state.cartProducts.findIndex(({ product }) => product.id === cartProduct.product.id);

            if(existingCartProductIndex >= 0){
                state.cartProducts[existingCartProductIndex].quantity += cartProduct.quantity;
                return;
            }

            state.cartProducts = [...state.cartProducts, cartProduct];
            localStorage.setItem('@ignite-shop-1.0.0 - cartProducts', JSON.stringify(state.cartProducts));
        },
        remove: (state, action) => {
            const productId = action.payload;

            if(!productId){
                return;
            }

            const existingProduct = state.cartProducts.find(({ product }) => product.id === productId);

            if(!existingProduct){
                return;
            }

            state.cartProducts = state.cartProducts.filter(({ product }) => product.id !== existingProduct.product.id);
            localStorage.setItem('@ignite-shop-1.0.0 - cartProducts', JSON.stringify(state.cartProducts));
        },
        clearCart: (state) => {
            state = initialState;
            localStorage.setItem('@ignite-shop-1.0.0 - cartProducts', JSON.stringify([]));
        }
    },
    extraReducers(builder) {
        builder.addCase(loadExistingCartProducts.fulfilled, (state, action) => {
            state.cartProducts = action.payload;
        })
        builder.addCase(addToCart.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
        });
    },
});

export const cart = cartSlice.reducer;
export const { add, remove, clearCart } = cartSlice.actions;