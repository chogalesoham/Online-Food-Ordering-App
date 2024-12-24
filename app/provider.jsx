"use client";

import Header from "@/components/header";
import React, { useState } from "react";
import { Toaster } from "sonner";
import { CartUpdateContext } from "./_context/card-updateContext";
import "@smastrom/react-rating/style.css";

const Provider = ({ children }) => {
  const [updateCart, setUpdateCart] = useState(false);
  return (
    <>
      <CartUpdateContext.Provider value={{ updateCart, setUpdateCart }}>
        <Header />
        <Toaster />
        <div className=" px-10 md:px-20 relative mt-24 mb-12">{children}</div>
      </CartUpdateContext.Provider>
    </>
  );
};

export default Provider;
