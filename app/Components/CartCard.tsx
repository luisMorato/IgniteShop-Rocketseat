import Image from "next/image";
import Link from "next/link";

import { useDispatch } from "react-redux";
import { productProps } from "../Store/Slices/Products";
import { remove } from "../Store/Slices/cart";
import ImageBox from "./ImageBox";

type cartCardProps = {
    product: productProps,
    unitQuantity: number
}

const CartCard = ({ product, unitQuantity }: cartCardProps) => {
  const dispatch = useDispatch();

  const handleRemoveProductFromCart = (productId: string) => {
    dispatch(remove(productId));
  }
  
  return (
    <Link
      href={`/Product/${product.id}`}
      prefetch={false}
      className="flex gap-5"
    >
      <ImageBox
        size="sm"
      >
        <Image src={product.imageUrl} alt="" width={100} height={92} />
      </ImageBox>
      <div className="flex-1">
        <h3 className="text-lg">{product.name}</h3>
        <div className="flex items-center gap-5 mb-3">
          <p className="text-lg font-semibold">R$ {(product.priceInCents / 100).toFixed(2).replace('.', ',')}</p>
          <div className="border border-neutral-400 px-2 rounded-lg">
            <span className="text-sm">{unitQuantity}</span>
          </div>
        </div>
        <button
          className="relative text-brand leading-none hover:text-brand/80"
          onClick={() => handleRemoveProductFromCart(product.id)}
        >
            Remover
        </button>
      </div>
    </Link>
  )
}

export default CartCard;