'use client';
import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";

import Cart from "./Cart";
import { useAppSelector } from "../Store";
import Button from "./Button";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathName = usePathname();

  const cartProducts = useAppSelector((store) => store.cart.cartProducts);
  const cartQuantity = useMemo(() => cartProducts.map((item) => item.quantity).reduce((prev, current) => prev + current, 0), [cartProducts]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const handleCartOpen = () => {
    setIsCartOpen(true);
  }

  const handleCartClose = () => {
    setIsCartOpen(false);
  }

  return (
    <header className="relative w-full pt-10 pb-8 px-3 lg:px-32">
        <div className={`flex items-center flex-1 ${pathName.includes('/Success') ? "justify-center" : "justify-between"}`}>
          <Link href="/">
            <Image src={'/assets/Logo.svg'} alt="" width={130} height={52} priority />
          </Link>
          {!pathName.includes('/Success') && (
            <Button
              onClick={handleCartOpen}
              colors={"secondary"}
            >
              <div className="absolute -top-2 -right-2 flex items-center justify-center size-6 text-sm font-medium bg-brand border-2 border-defaultBackground rounded-full">{cartQuantity > 9 ? "9+" : cartQuantity}</div>
              <HiOutlineShoppingBag size={24} />
            </Button>
          )}
        </div>
        {isCartOpen && (
          <Cart
            cartQuantity={cartQuantity}
            handleCartClose={handleCartClose}
          />
        )}
    </header>
  )
}
