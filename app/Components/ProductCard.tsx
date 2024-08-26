import Image from "next/image";
import Link from "next/link";

import { ClipLoader } from "react-spinners";
import { HiOutlineShoppingBag } from "react-icons/hi";

import { useAppSelector } from "../Store";
import { priceFormatter } from "../lib/PriceFormatter";

import Button from "./Button";
import ImageBox from "./ImageBox";

type productCardProps = {
  id: string,
  imgsrc: string,
  name: string,
  price: number,
  handleAddProductToCart: (productId: string) => void,
}

const ProductCard = ({ id, imgsrc, name, price, handleAddProductToCart }: productCardProps) => {
    const isLoading = useAppSelector((state) => {
        return state.cart.isLoading;
    });

    const currencyFormatedPrice = priceFormatter(( price / 100 ));

    return (
        <ImageBox
            size="md"
            className="keen-slider__slide"
        >
            <Link href={`/Product/${id}`} prefetch={false}>
                <Image
                    src={imgsrc}
                    alt=""
                    width={520}
                    height={480}
                    priority
                    className="flex-shrink-0 flex-1 transition-all duration-150 group-hover:scale-105 object-cover"
                />
            </Link>
            <footer className="absolute left-1/2 -translate-x-1/2 bottom-1 bg-grayBase/90 flex justify-between rounded-md p-5 w-[calc(100%_-_0.5rem)] translate-y-[105%] group-hover:translate-y-0 transition-all duration-150">
                <div className="space-y-3">
                    <h2 className="font-bold md:text-xl">{ name }</h2>
                    <span className="text-2xl text-brand font-semibold">{currencyFormatedPrice}</span>
                </div>
                <Button
                    onClick={() => handleAddProductToCart(id)}
                    disabled={isLoading}
                    colors="primary"
                >
                    {isLoading ? <ClipLoader size={28} color="#FFF" /> : <HiOutlineShoppingBag size={32} className="flex-shrink-0" />}
                </Button>
            </footer>
        </ImageBox>
    )
}

export default ProductCard;