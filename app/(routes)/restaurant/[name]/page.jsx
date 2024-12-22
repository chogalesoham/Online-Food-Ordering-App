"use client";

import globalApi from "@/app/_utils/global-api";
import RestaurantInfo from "@/components/restaurant-info";
import RestaurantTab from "@/components/restaurant-tab";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Restaurant = () => {
  const [restaurantDetailsData, setRestaurantDetailsData] = useState([]);
  const pathname = usePathname();
  const restaurantId = pathname.split("id=")[1];

  const getRestaurant = (restaurantId) => {
    const restaurantData = globalApi
      .GetRestaurantDetails(restaurantId)
      .then((res) => setRestaurantDetailsData(res?.restaurant));
  };

  useEffect(() => {
    getRestaurant(restaurantId);
  }, []);

  return (
    <div>
      <RestaurantInfo restaurantDetailsData={restaurantDetailsData} />
      <RestaurantTab restaurantDetailsData={restaurantDetailsData} />
    </div>
  );
};

export default Restaurant;
