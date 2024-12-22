import Image from "next/image";
import React from "react";
import star from "@/public/star.png";
import { MapPin } from "lucide-react";

const RestaurantInfo = ({ restaurantDetailsData }) => {
  console.log("restaurantDetailsData", restaurantDetailsData);
  return (
    <div>
      <div>
        {restaurantDetailsData?.banner?.url ? (
          <Image
            src={restaurantDetailsData?.banner?.url}
            width={1000}
            height={500}
            alt={restaurantDetailsData?.name}
            title={restaurantDetailsData?.name}
            className=" w-full h-[400px] object-fill rounded-xl"
          />
        ) : (
          <div className="w-full h-[400px] object-cover rounded-xl bg-slate-200 animate-pulse"></div>
        )}
      </div>

      {restaurantDetailsData?.name || restaurantDetailsData?.address ? (
        <div>
          <h2 className=" text-3xl font-bold mt-2">
            {restaurantDetailsData?.name}
          </h2>
          <div className=" flex items-center gap-2">
            <Image src={star} alt="star" width={20} height={20} />
            <label className=" text-sm text-gray-700">4.5 (60)</label>
          </div>
          <h2 className=" text-gray-500 mt-2 flex gap-2 items-center">
            <MapPin />
            {restaurantDetailsData?.address}
          </h2>
        </div>
      ) : (
        <div className=" mt-2 flex flex-col gap-2">
          <h1 className="w-[30%] h-[20px] object-cover rounded-xl bg-slate-200 animate-pulse"></h1>
          <div className="w-[40%] h-[20px] object-cover rounded-xl bg-slate-200 animate-pulse"></div>
          <h2 className="w-[25%] h-[20px] object-cover rounded-xl bg-slate-200 animate-pulse"></h2>
        </div>
      )}
    </div>
  );
};

export default RestaurantInfo;
