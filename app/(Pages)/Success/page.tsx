'use client';
import Image from "next/image";
import {
  useRouter,
  useSearchParams
} from "next/navigation";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";
import { clearCart } from "@/app/Store/Slices/cart";
import { useAppDispatch } from "@/app/Store";

import Loading from "@/app/loading";
import ImageBox from "@/app/Components/ImageBox";

interface sessionDataProps {
  userName: string,
  products: {
    id: string,
    name: string,
    desc: string,
    imageUrl: string,
    quantity: number
  }[]
}

const Success = () => {
  const router = useRouter();
  const params = useSearchParams();
  const sessionId = params.get('session_id');

  const dispatch = useAppDispatch();

  if(!sessionId) {
    router.push('/');
  }

  const [sessionData, setSessionData] = useState<sessionDataProps>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        '/api/Checkout',
        {
          params: {
            sessionId
          }
        }
      );

      if(response.status === 200) {
        const { sessionData } = response.data;
        setSessionData(sessionData);
      }
    }

    fetchData();
  }, [sessionId]);

  const productsQuantity = sessionData?.products.reduce((acc, product) => {
    return acc += product.quantity
  }, 0);

  const handleBackHome = () => {
    dispatch(clearCart());
    router.push('/');
  }

  if(!sessionData?.products) {
    return <Loading />
  }

  return sessionData && (
    <div className="flex flex-col items-center mt-24">
      <main className="mb-16 max-w-[36rem]">
        <div 
          className={`flex justify-center mx-auto mb-12`}
          style={{ transform: `translateX(${(sessionData.products.length - 1) * 5}%)` }}
        >
          {sessionData.products.map((product, i) => (
            <ImageBox
              size="sm" 
              rounded="full" 
              key={product.id} 
              style={{ transform: `translateX(-${i * 36}%)` }} 
              className="size-36 shadow-cardShadow"
            >
              <Image
                className="object-cover"
                src={product.imageUrl}
                alt=""
                width={130}
                height={140}
              />
            </ImageBox>
          ))}
        </div>
        <div className="flex flex-col gap-6 px-4">
          <h1 className="text-center text-3xl font-bold">Compra Efetuada!</h1>
          <p className="text-center text-wrap sm:text-2xl">Uhuul <strong>{sessionData.userName}</strong>, sua compra de {productsQuantity} camisetas já está a caminho da sua casa.</p>
        </div>
      </main>
      <footer>
        <button
          onClick={handleBackHome}
          className="text-brand text-lg font-medium hover:underline"
        >
          Voltar ao Catálogo
        </button>
      </footer>
    </div>
  )
}

export default Success;
