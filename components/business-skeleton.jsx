import React from "react";

const BusinessSkeleton = () => {
  return (
    <div>
      <div className=" h-[130px] w-full bg-slate-200 rounded-xl animate-pulse"></div>
      <div className=" rounded-lg w-full h-5 bg-slate-200 mt-3 animate-pulse"></div>
    </div>
  );
};

export default BusinessSkeleton;
