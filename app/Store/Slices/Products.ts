import { stripe } from "@/app/lib/Stripe";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Stripe from "stripe";

export interface productProps {
    id: string,
    name: string,
    desc: string | null,
    priceInCents: number,
    priceId: string,
    imageUrl: string,
}

interface initialStateProps {
    products: productProps[],
    uniqueProduct: productProps | null
    isPending: boolean,
}

export const fetchProducts = createAsyncThunk(
    'products/load',
    async () => {
        const response = await stripe.products.list({
            expand: ['data.default_price'],
        });
        const { data } = response;

        const products = data.map((item) => {
            const price = item.default_price as Stripe.Price;
            if(!price.unit_amount) {
                throw new Error('Price Is Required');
            }

            return {
                id: item.id,
                name: item.name,
                desc: item.description,
                priceInCents: price.unit_amount,
                priceId: price.id,
                imageUrl: item.images[0]
            }
        });

        return products;
    }
);

export const fetchUniqueProduct = createAsyncThunk(
    'product/load',
    async (productId: string) => {
        const data = await stripe.products.retrieve(productId, {
            expand: ['default_price'],
        });

        const price = data.default_price as Stripe.Price;

        const product = {
            id: data.id,
            name: data.name,
            desc: data.description,
            priceInCents: price.unit_amount ?? 0,
            priceId: price.id,
            imageUrl: data.images[0],
        }

        return product;
    }
)

const initialState: initialStateProps = {
    products: [],
    uniqueProduct: null,
    isPending: true,
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isPending = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isPending = false;
        });
        builder.addCase(fetchUniqueProduct.pending, (state) => {
            state.isPending = true;
        });
        builder.addCase(fetchUniqueProduct.fulfilled, (state, action) => {
            state.uniqueProduct = action.payload;
            state.isPending = false;
        });
    }
});

export const productsReducer = productSlice.reducer;
