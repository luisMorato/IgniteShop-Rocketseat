'use server';

import { NextRequest } from "next/server";

import { env } from "@/app/Schemas/envSchema";
import { stripe } from "@/app/lib/Stripe";
import { productProps } from "@/app/Store/Slices/Products";
import Stripe from "stripe";

interface cartProducts {
    product: productProps,
    quantity: number
}

export const POST = async (req: NextRequest) => {
    const cartProducts: Promise<cartProducts[]> = await req.json();

    if(!cartProducts) {
        return new Response(JSON.stringify({ error: 'O carrinho está vazio' }), {
            status: 400,
        });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
        success_url: `${env.NEXT_URL}/Success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${env.NEXT_URL}/Cancel`,
        mode: 'payment',
        currency: 'BRL',
        line_items: (await cartProducts).map((cartProduct) => {
            return {
                price: cartProduct.product.priceId,
                quantity: cartProduct.quantity,
            }
        }),
    });

    const checkoutUrl = checkoutSession.url;

    return new Response(JSON.stringify({ checkoutUrl }), {
        status: 201,
    });
}

export const GET = async (req: NextRequest) => {
    const sessionId = req.nextUrl.searchParams.get('sessionId');

    if(!sessionId) {
        return new Response(JSON.stringify({ error: 'Você Não Possui Autorização' }), {
            status: 401,
        })
    }

    const response = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    });

    const stripeProducts = response.line_items?.data.map((item) => {
        return {
            product: item.price?.product,
            quantity: item.quantity
        }
    });

    interface sessionDataProps {
        product: Stripe.Product,
        quantity: number
    }

    const sessionData = {
        userName: response.customer_details?.name,
        products: (stripeProducts as sessionDataProps[])?.map(({product, quantity}) => {
            return {
                id: product?.id,
                name: product?.name,
                desc: product?.description,
                imageUrl: product?.images[0],
                quantity
            }
        })
    }

    return new Response(JSON.stringify({ sessionData }), {
        status: 200,
    })
}