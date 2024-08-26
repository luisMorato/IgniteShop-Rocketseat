import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Ignite Shop - product",
    description: "Ignite Shop",
};
  
export default function ProductLayout({ children }: { children: ReactNode }) {
    return (
        <>{ children }</>
    )
}