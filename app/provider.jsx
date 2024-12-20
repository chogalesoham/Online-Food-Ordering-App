import Header from "@/components/header";
import React from "react";

const Provider = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Provider;
