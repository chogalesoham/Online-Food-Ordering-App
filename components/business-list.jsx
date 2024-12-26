"use client";

import globalApi from "@/app/_utils/global-api";
import React, { useEffect, useState } from "react";
import BusinessItem from "./business-item";
import BusinessSkeleton from "./business-skeleton";

const BusinessList = ({ selectedCategory }) => {
  const [businessList, setBusinessList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getBusinessList(selectedCategory || "all");
  }, [selectedCategory]);

  const getBusinessList = async (category) => {
    setIsLoading(true);
    try {
      const res = await globalApi.GetBusiness(category);
      setBusinessList(res?.restaurants || []);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    } catch (error) {
      console.error("Failed to fetch business list:", error);
      setBusinessList([]);
    }
  };

  return (
    <div className="mt-5 container mx-auto">
      <h2 className="font-bold text-2xl capitalize my-2">
        Popular {selectedCategory.replace("-", " ")} Restaurants
      </h2>
      <h2 className="font-semibold text-orange-600 capitalize text-sm">
        {businessList?.length} Results Of {selectedCategory.replace("-", " ")}
      </h2>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-3">
          {Array.from({ length: 12 }).map((_, index) => (
            <BusinessSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-3">
          {businessList.map((item, index) => (
            <BusinessItem item={item} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BusinessList;
