import { X } from "lucide-react";
import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "./ui/button";
import globalApi from "@/app/_utils/global-api";
import { toast } from "sonner";
import { CartUpdateContext } from "@/app/_context/card-updateContext";
import CartEmpty from "@/public/cart-empty.png";
import Link from "next/link";

const Cart = ({ cartData }) => {
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);

  const totalAmount = () => {
    let total = 0;
    cartData.forEach((item) => {
      total = total + item?.price;
    });
    return total.toFixed(1);
  };

  const handelRemoveFromCart = (id) => {
    globalApi.DeleteFromCart(id).then((res) => {
      console.log(res);
      if (res) {
        globalApi.RemoveCart(id).then((res) => {
          toast("Item Remove From Cart !");
          setUpdateCart(!updateCart);
        });
      }
    });
  };

  return (
    <div className=" flex flex-col items-center  justify-between overflow-x-auto">
      <p className=" h-[1px] w-[100%] bg-black"></p>

      {cartData?.length <= 0 ? (
        <div className="my-4 h-[80vh] w-full flex flex-col items-center justify-center">
          <Image src={CartEmpty} width={500} height={500} alt="cart-empty" />
        </div>
      ) : (
        <div className=" my-4 h-[80vh] w-full flex flex-col items-center justify-start gap-4 mt-4 overflow-x-auto scrollbar-hide">
          {cartData?.map((cart) => (
            <div
              key={cart?.id}
              className="  w-full h-20 md:h-24 flex items-center justify-between border border-orange-400 rounded-lg p-2 hover:bg-orange-50"
            >
              <Image
                src={cart?.productImage}
                alt="cart"
                height={80}
                width={80}
                className=" rounded-xl object-cover w-[50px] md:w-[80px] h-[50px] md:h-[80px]"
              />
              <div className=" flex w-[60%] flex-col gap-1 items-start">
                <p className=" text-sm md:text-lg font-semibold text-black">
                  {cart?.productName}
                </p>
                <p className="md:font-bold text-black">Price: ₹{cart?.price}</p>
              </div>
              <X
                onClick={() => handelRemoveFromCart(cart?.id)}
                className=" bg-red-600 p-1 text-white text-2xl font-bold rounded-lg cursor-pointer hover:bg-black"
              />
            </div>
          ))}
        </div>
      )}
      <Link
        className=" w-full"
        href={`/checkout?restaurant=${cartData[0]?.restaurant?.name}`}
      >
        <Button className=" my-1 w-full">Checkout: ₹ {totalAmount()}</Button>
      </Link>
    </div>
  );
};

export default Cart;
