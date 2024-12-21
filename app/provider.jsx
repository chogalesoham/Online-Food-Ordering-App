import Header from "@/components/header";
import React from "react";

const Provider = ({ children }) => {
  return (
    <>
      <Header />
      <div className=" px-10 md:px-20 relative mt-24">{children}</div>
    </>
  );
};

export default Provider;
