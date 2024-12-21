"use client";

import globalApi from "@/app/_utils/global-api";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import BusinessItem from "./business-item";
import BusinessSkeleton from "./business-skeleton";

const BusinessList = () => {
  const params = useSearchParams();
  const [category, setCategory] = useState("all");
  const [businessList, setBusinessList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const categoryParam = params?.get("category") || "all";
    setCategory(categoryParam);
    getBusinessList(categoryParam);
  }, [params]);

  const getBusinessList = async (category_) => {
    setIsLoading(true);
    try {
      const res = await globalApi.GetBusiness(category_);
      console.log("Business List:", res);
      setBusinessList(res?.restaurants);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    } catch (error) {
      console.error("Failed to fetch business list:", error);
    }
  };

  return (
    <div className=" mt-5 container mx-auto">
      <h2 className=" font-bold text-2xl capitalize my-2">
        Popular {category.replace("-", " ")} Restaurants
      </h2>
      <h2 className=" font-semibold text-orange-600 capitalize text-sm">
        {businessList?.length} Results Of {category.replace("-", " ")}
      </h2>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
            return <BusinessSkeleton key={index} />;
          })}
        </div>
      ) : (
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-3">
          {businessList.map((item, index) => {
            return <BusinessItem item={item} key={index} />;
          })}
        </div>
      )}
    </div>
  );
};

export default BusinessList;
