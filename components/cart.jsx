import { X } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import globalApi from "@/app/_utils/global-api";
import { toast } from "sonner";
import { CartUpdateContext } from "@/app/_context/card-updateContext";
import CartEmpty from "@/public/cart-empty.png";
import Link from "next/link";

const Cart = ({ cartData = [] }) => {
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
  const [isDisabled, setIsDisabled] = useState(true);

  // Update `isDisabled` based on `cartData.length`
  useEffect(() => {
    setIsDisabled(cartData.length === 0);
  }, [cartData]);

  // Memoize total amount calculation
  const totalAmount = useMemo(() => {
    return cartData
      .reduce((total, item) => total + (item?.price || 0), 0)
      .toFixed(1);
  }, [cartData]);

  const handleRemoveFromCart = async (id) => {
    try {
      const deleteResponse = await globalApi.DeleteFromCart(id);
      if (deleteResponse) {
        await globalApi.RemoveCart(id);
        toast.success("Item removed from cart!");
        setUpdateCart(!updateCart);
      }
    } catch (error) {
      toast.error("Failed to remove item from cart. Please try again.");
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between overflow-x-auto">
      <p className="h-[1px] w-full bg-black"></p>

      {cartData.length === 0 ? (
        <div className="my-4 h-[80vh] w-full flex flex-col items-center justify-center">
          <Image src={CartEmpty} width={500} height={500} alt="Empty cart" />
        </div>
      ) : (
        <div className="my-4 h-[80vh] w-full flex flex-col items-center justify-start gap-4 mt-4 overflow-x-auto scrollbar-hide">
          {cartData.map((cart) => (
            <div
              key={cart.id}
              className="w-full h-20 md:h-24 flex items-center justify-between border border-orange-400 rounded-lg p-2 hover:bg-orange-50"
            >
              <Image
                src={cart?.productImage}
                alt={cart?.productName || "Product"}
                height={80}
                width={80}
                className="rounded-xl object-cover w-[50px] md:w-[80px] h-[50px] md:h-[80px]"
              />
              <div className="flex w-[60%] flex-col gap-1 items-start">
                <p className="text-sm md:text-lg font-semibold text-black">
                  {cart?.productName || "Product Name"}
                </p>
                <p className="md:font-bold text-black">
                  Price: ₹{cart?.price || 0}
                </p>
              </div>
              <X
                onClick={() => handleRemoveFromCart(cart?.id)}
                className="bg-red-600 p-1 text-white text-2xl font-bold rounded-lg cursor-pointer hover:bg-black"
                aria-label="Remove item from cart"
              />
            </div>
          ))}
        </div>
      )}

      <Link
        className="w-full"
        href={
          !isDisabled
            ? `/checkout?restaurant=${cartData[0]?.restaurant?.name}`
            : "#"
        }
      >
        <Button
          disabled={isDisabled}
          className={`w-full rounded-s ${
            isDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
          }`}
        >
          Checkout: ₹ {totalAmount}
        </Button>
      </Link>
    </div>
  );
};

export default Cart;
