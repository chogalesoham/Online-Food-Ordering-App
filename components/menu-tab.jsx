import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { SquarePlus } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import globalApi from "@/app/_utils/global-api";
import { toast } from "sonner";
import { CartUpdateContext } from "@/app/_context/card-updateContext";

const MenuTab = ({ restaurantDetailsData }) => {
  const [menuItemList, setMenuItemList] = useState([]);
  const { user } = useUser();

  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);

  useEffect(() => {
    restaurantDetailsData?.menu &&
      filterMenu(restaurantDetailsData?.menu[0]?.category);
  }, [restaurantDetailsData]);

  const filterMenu = (category) => {
    const result = restaurantDetailsData?.menu?.filter(
      (item) => item?.category === category
    );
    setMenuItemList(result[0]);
  };

  const addToCardHandler = (item) => {
    toast("Item Adding to Cart");
    const data = {
      email: user?.primaryEmailAddress?.emailAddress,
      price: item?.price,
      description: item?.description,
      productImage: item?.productImage?.url,
      productName: item?.name,
      resId: restaurantDetailsData?.id,
    };
    // console.log("card data: ", data.resId);
    globalApi.AddToCart(data).then(
      (res) => {
        toast("Item Added to Cart");
        setUpdateCart(!updateCart);
      },
      (error) => {
        toast("Error While Adding into Cart");
      }
    );
  };

  return (
    <div>
      <div className=" grid grid-cols-4 mt-2">
        <div className=" hidden md:flex flex-col mr-10 gap-2 mt-3">
          {restaurantDetailsData?.menu?.map((item, index) => {
            return (
              <Button
                variant="outline"
                key={index}
                className=" flex justify-start"
                onClick={() => filterMenu(item?.category)}
              >
                {item?.category}
              </Button>
            );
          })}
        </div>
        <div className=" md:col-span-3 col-span-4 mb-6  ">
          <h2 className=" font-bold text-2xl my-2">{menuItemList?.category}</h2>
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
            {menuItemList?.menuItem &&
              menuItemList?.menuItem.map((item, index) => (
                <div
                  key={index}
                  className=" p-2 flex gap-3 border rounded-xl items-center hover:border-orange-400 cursor-pointer hover:bg-orange-50"
                >
                  <Image
                    src={item?.productImage?.url}
                    alt={item?.name}
                    width={120}
                    height={120}
                    className=" object-cover w-[120px] h-[120px] rounded-lg"
                  />
                  <div className=" flex flex-col gap-1">
                    <h2 className=" font-bold">{item?.name}</h2>
                    <h2>₹{item?.price}</h2>
                    <p className=" text-sm text-gray-400 line-clamp-2">
                      {item?.description}
                    </p>
                    <SquarePlus
                      onClick={() => addToCardHandler(item)}
                      className=" cursor-pointer"
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuTab;
