"use client";
import { CartUpdateContext } from "@/app/_context/card-updateContext";
import globalApi from "@/app/_utils/global-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { Loader, Minus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [subTotal, setSubTotal] = useState();
  const [deliveryAmount, setDeliveryAmount] = useState(5);
  const [tax, setTax] = useState();
  const [total, setTotal] = useState();
  const { user } = useUser();
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
  const [billingDetails, setBillingDetails] = useState({
    userName: "",
    email: "",
    phone: "",
    zip: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  console.log(cart);

  const params = useSearchParams();
  useEffect(() => {
    console.log(params.get("restaurant"));
  }, []);

  const getUserCart = async () => {
    try {
      setIsLoading(true);
      if (user?.primaryEmailAddress?.emailAddress) {
        const res = await globalApi.GetUserCart(
          user.primaryEmailAddress.emailAddress
        );
        setCart(res?.userCarts || []);
        calculateTotalAmount(res?.userCarts || []);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) getUserCart();
  }, [updateCart, user]);

  const calculateTotalAmount = (_cart) => {
    let total = 0;
    _cart?.forEach((item) => {
      total = total + item?.price;
    });
    setSubTotal(total.toFixed(2));
    const totalTax = total * 0.03;
    setTax(totalTax.toFixed(2));
    setTotal((total + total * 0.03 + deliveryAmount).toFixed(2));
  };

  const handelBillingDetails = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addToOrder = () => {
    setLoading(true);
    const data = {
      email: user?.primaryEmailAddress?.emailAddress,
      orderAmount: total,
      restaurantName: params.get("restaurant"),
      userName: user?.fullName,
      phone: billingDetails?.phone,
      address: billingDetails?.address,
      zipCode: billingDetails?.zip,
    };
    globalApi.CretaeNewOrder(data).then(
      (res) => {
        const resultId = res.createOrder.id;
        if (resultId) {
          cart.forEach((item) => {
            globalApi
              .UpdateOrderToAddOrderItem(
                item?.productName,
                item?.price,
                resultId,
                user?.primaryEmailAddress?.emailAddress
              )
              .then(
                (res) => {
                  console.log(res);
                  setLoading(false);
                  toast("Order Plase Successfully 👍");
                  setUpdateCart(!updateCart);
                },
                (error) => {
                  setLoading(false);
                }
              );
          });
        }
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  console.log(billingDetails);

  return (
    <div className=" w-full flex-col flex items-center justify-center">
      <h1 className=" text-4xl font-bold uppercase">Checkout Your Items</h1>
      <div className="flex items-center justify-center gap-8 flex-col md:flex-row w-full py-10 px-5">
        <div className="w-[50%] py-6 px-3">
          <h2 className=" text-3xl font-bold py-6 px-2">Billing Details</h2>
          <form>
            <div className=" flex items-center gap-2 my-3">
              <Input
                name="userName"
                value={billingDetails.userName}
                onChange={handelBillingDetails}
                type="text"
                placeholder="Name"
              />
              <Input
                name="email"
                value={billingDetails.email}
                onChange={handelBillingDetails}
                type="text"
                placeholder="Email"
              />
            </div>
            <div className=" flex items-center gap-2 my-3   ">
              <Input
                name="phone"
                value={billingDetails.phone}
                onChange={handelBillingDetails}
                type="text"
                placeholder="Phone"
              />
              <Input
                name="zip"
                value={billingDetails.zip}
                onChange={handelBillingDetails}
                type="text"
                placeholder="Zip"
              />
            </div>
            <Textarea
              name="address"
              value={billingDetails.address}
              onChange={handelBillingDetails}
              type="text"
              placeholder="Address"
            />
          </form>
        </div>
        <div className="w-[35%] border border-gray-500 flex flex-col">
          <h2 className=" text-center py-2 bg-gray-300 text-2xl font-semibold">
            Total Carts:- ({cart.length})
          </h2>

          <p className=" font-bold py-4 px-3 flex justify-between">
            SubTotal: <span>₹{subTotal}</span>
          </p>
          <hr />
          <div className=" py-2">
            <p className=" py-3 px-3 flex justify-between">
              Delivery: <span>₹{deliveryAmount}</span>
            </p>
            <p className=" py-3 px-3 flex justify-between">
              Tax(3%): <span>₹{tax}</span>
            </p>
          </div>
          <hr />
          <p className=" py-4 px-3 font-bold flex justify-between items-center">
            Total: <span>₹{total}</span>
          </p>
          <Button
            onClick={() => addToOrder()}
            className=" w-[95%] m-4 rounded-s"
          >
            {loading ? <Loader className=" animate-spin" /> : "   Make Payment"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
