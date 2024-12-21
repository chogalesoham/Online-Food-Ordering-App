import Image from "next/image";
import React from "react";
import Star from "@/public/star.png";

const BusinessItem = ({ item }) => {
  console.log("data", item);

  return (
    <div className=" p-4 hover:border rounded-xl hover:border-orange-500 transition-all ease-in-out hover:bg-orange-50 cursor-pointer shadow-lg">
      <Image
        alt={item?.name}
        height={130}
        width={500}
        src={item?.banner?.url}
        className=" h-[130px] rounded-xl"
      />
      <div className=" mt-2">
        <h2 className=" font-bold text-lg">{item?.name}</h2>
        <div className=" flex justify-between items-center">
          <div className=" flex gap-2 items-center">
            <Image src={Star} width={14} height={14} alt="Star" />
            <label className=" text-gray-400 text-sm">4.5</label>
            <h2 className=" text-gray-400 text-sm">{item?.restroType[0]}</h2>
          </div>
          <h2 className=" text-sm text-orange-600">
            {(item?.category[1]?.name).replace("-", " ")}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default BusinessItem;
