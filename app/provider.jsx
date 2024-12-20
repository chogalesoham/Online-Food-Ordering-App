import Header from "@/components/header";
import React from "react";

const Provider = ({ children }) => {
  return (
    <div className=" px-10 md:px-20 relative">
      <Header />
      {children}
    </div>
  );
};

export default Provider;
