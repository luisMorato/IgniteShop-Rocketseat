'use client';
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from 'react-toastify';
import { FaX } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";

import axios from "axios";

import { useAppSelector } from "../Store";

import Button from "./Button";
import CartCard from "./CartCard";

import { priceFormatter } from "../lib/PriceFormatter";

type cartProps = {
    cartQuantity: number,
    handleCartClose: () => void,
}

const Cart = ({ cartQuantity, handleCartClose }: cartProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const cartProducts = useAppSelector((store) => store.cart.cartProducts);

    const totalInCents = cartProducts.reduce((acc, current) => {
        return (acc += (current.product.priceInCents * current.quantity));
    }, 0);

    const formatedTotalPrice = priceFormatter(totalInCents / 100);

    const handleCreateCheckout = async () => {
        if(cartProducts.length === 0) {
            toast.error('Carrinho Está Vazio');
            return;
        }

        try {
            startTransition(async () => {
                const response = await axios.post(
                    '/api/Checkout',
                    cartProducts,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    },
                );
    
                const { checkoutUrl } = response.data;
                router.push(checkoutUrl);
            })
        } catch (error) {
            console.log('Error: ', error);
            toast.error('Erro ao Criar o Checkout');
        }
    }

    return (
        <div className="bg-grayBase flex flex-col justify-between h-screen fixed top-0 right-0 z-30 pb-12 px-12 pt-20 w-full sm:w-[30rem]">
            <div>
                <header className="flex items-center justify-between mb-8">
                    <h2 className="font-semibold">Sacola de compras</h2>
                    <button
                        className="leading-none absolute top-6 right-6 hover:scale-110"
                        onClick={handleCartClose}
                    >
                        <FaX size={14} />
                    </button>
                </header>
                <div className="flex flex-col gap-6">
                    {cartProducts.length > 0 ?
                        (
                            cartProducts.map((cartProduct) => {
                            const { product, quantity } = cartProduct;
                            return (
                                <CartCard
                                    key={product.id}
                                    product={product}
                                    unitQuantity={quantity}
                                />
                            )})
                        )
                        : 
                        (<p>O Carrinho Está Vazio</p>)
                    }
                </div>
            </div>
            <footer>
                <div className="flex justify-between">
                    <span>Quantidade</span>
                    <span>{cartQuantity} itens</span>
                </div>
                <div className="flex justify-between items-baseline mb-14">
                    <span className="text-lg font-semibold">Valor total</span>
                    <span className="text-2xl font-semibold">{formatedTotalPrice}</span>
                </div>
                <Button
                    colors="primary"
                    padding="md"
                    disabled={isPending}
                    onClick={handleCreateCheckout}
                >
                    {isPending ? <ClipLoader size={28} color="#FFF" /> : "Finalizar Compra"}
                </Button>
            </footer>
        </div>
    )
}

export default Cart;