"use client";
import {
    useCallback,
    useEffect,
    useState
} from "react";
import { useKeenSlider } from "keen-slider/react";
import { IoIosArrowForward } from "react-icons/io";

import {
    addToCart,
    loadExistingCartProducts
} from "./Store/Slices/cart";
import { fetchProducts } from "./Store/Slices/Products";
import {
    useAppDispatch,
    useAppSelector
} from "./Store";

import ProductCard from "./Components/ProductCard";
import ProductsSkeleton from "./Components/ProductsSkeleton";

export default function Home() {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => {
        return state.productsReducer.products;
    });
    const isProductsPending = useAppSelector((state) => {
        return state.productsReducer.isPending;
    });

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(loadExistingCartProducts());
    }, [dispatch])

    const [windowWidth, setWindowWidth] = useState<number>();

    useEffect(() => {
        const updateWindowWidth = () => {
            setWindowWidth(window.innerWidth);
        };

        updateWindowWidth();

        window.addEventListener('resize', updateWindowWidth);

        return () => {
            window.removeEventListener('resize', updateWindowWidth);
        };
    }, []);

    const checkWindowWidth = () => {
        if(!windowWidth){
            return;
        }

        if(windowWidth < 768) {
            return 1;
        } else if (windowWidth < 1280) {
            return 2;
        } else {
            return 3
        }
    }

    const [sliderRef, instanceRef] = useKeenSlider({
        slides: {
            perView: checkWindowWidth(),
            spacing: 32,
            origin: "auto",
        },
    });

    const handleMoveToNextSlide = () => {
        instanceRef.current?.next();
    }

    const handleAddProductToCart = useCallback((productId: string) => {
        dispatch(addToCart(productId));
    }, [dispatch]);

    if(isProductsPending) {
        return (
            <div className="flex lg:translate-x-32 max-lg:px-5">
                <div className="flex gap-8">
                    <ProductsSkeleton />
                </div>
            </div>
        )
    }
    
    return (
        <main className="relative overflow-hidden">
            <div 
                ref={sliderRef} 
                className="flex lg:translate-x-32 keen-slider"
            >
                {/* {isProductsPending ? (
                    <div className="flex gap-8">
                        <ProductsSkeleton />
                    </div>
                )
                : ( */}
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            imgsrc={product.imageUrl}
                            name={product.name}
                            price={product.priceInCents}
                            handleAddProductToCart={handleAddProductToCart}
                        />
                    ))}
                {/* )} */}
            </div>
            <div className="max-md:hidden absolute top-0 right-0 h-screen bg-gradient-to-r from-[rgba(18,18,20,0)] to-[#121214] w-32">
                <button
                    onClick={handleMoveToNextSlide}
                    disabled={isProductsPending}
                    className="absolute top-[30%] right-5 hover:[&:not(:disabled)]:scale-110 disabled:cursor-not-allowed"
                >
                    <IoIosArrowForward size={48} />
                </button>
            </div>
        </main>
    );
}