'use client';
import { ReactNode } from "react";
import { Header } from "./Header";

import { store } from "../Store";
import { Provider as ReduxProvider } from "react-redux";

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ReduxProvider store={store}>
        <Header />
        {children}
    </ReduxProvider>
  )
}

export default DefaultLayout;