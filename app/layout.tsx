import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

//Components
import DefaultLayout from "./Components/DefaultLayout";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "900"] });

export const metadata: Metadata = {
  title: "Ignite Shop - Rocketseat",
  description: "Ignite Shop Rocketseat",
  icons: [{ rel: "icon", url: "/assets/Logo.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`${roboto.className} bg-defaultBackground`}>
          <DefaultLayout>
            <ToastContainer 
              closeOnClick
              pauseOnHover
              theme="dark"
            />
            { children }
          </DefaultLayout>
        </body>
    </html>
  );
}
