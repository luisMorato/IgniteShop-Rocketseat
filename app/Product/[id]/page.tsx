'use client';
import {
  useCallback,
  useEffect
} from "react";
import Image from "next/image";
import { ClipLoader } from "react-spinners";

import {
  useAppDispatch,
  useAppSelector
} from "@/app/Store";
import { addToCart } from "@/app/Store/Slices/cart";
import { fetchUniqueProduct } from "@/app/Store/Slices/Products";

import Button from "@/app/Components/Button";
import Loading from "../../loading";
import ImageBox from "@/app/Components/ImageBox";

import { priceFormatter } from "@/app/lib/PriceFormatter";

interface uniqueProductProps {
  params: {
    id: string
  }
}

const IndividualProduct = ({ params }: uniqueProductProps) => {
  const dispatch = useAppDispatch();
  const productId = String(params.id);

  useEffect(() => {
    if(productId){
      dispatch(fetchUniqueProduct(productId));
    }
  }, [productId, dispatch]);

  const product = useAppSelector((state) => state.productsReducer.uniqueProduct);
  const currencyFormatedPrice = product && priceFormatter(product.priceInCents / 100);

  const handleAddProductToCart = useCallback(() => {
    dispatch(addToCart(productId));
  }, [dispatch, productId]);

  const isCartPending = useAppSelector((state) => {
    return state.cart.isLoading;
  });
  const isProductPending = useAppSelector((state) => state.productsReducer.isPending);

  if(isProductPending) {
    return <Loading />
  }

  return product && (
    <div className="flex max-xl:flex-col max-xl:items-center max-xl:pb-8 xl:gap-20 2xl:justify-center px-5 xl:px-32">
      <ImageBox
        size="md"
      >
        <Image
          src={product.imageUrl}
          alt=""
          className="object-cover hover:cursor-zoom-in"
          width={520}
          height={480}
          priority
        />
      </ImageBox>
      <div className="flex flex-col justify-between max-w-[32.5rem] max-xl:gap-8">
        <div className="mt-10">
          <h1 className="mb-4 text-3xl font-semibold">{product.name}</h1>
          <p className="mb-10 text-3xl text-brand">{currencyFormatedPrice}</p>
          <p className="text-lg">{product.desc}</p>
        </div>
        <Button
          onClick={handleAddProductToCart}
          colors="primary"
          padding="md"
        >
          {isCartPending ? <ClipLoader size={28} color="#FFF" /> : "Colocar na Sacola"}
        </Button>
      </div>
    </div>
  )
}

export default IndividualProduct;