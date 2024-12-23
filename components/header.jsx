"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Logo from "@/public/logo.png";
import { Search, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { CartUpdateContext } from "@/app/_context/card-updateContext";
import globalApi from "@/app/_utils/global-api";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Cart from "./cart";

const Header = () => {
  const { user, isSignedIn } = useUser();
  const { updateCart } = useContext(CartUpdateContext);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUserCart = async () => {
    try {
      setIsLoading(true);
      if (user?.primaryEmailAddress?.emailAddress) {
        const res = await globalApi.GetUserCart(
          user.primaryEmailAddress.emailAddress
        );
        setCart(res?.userCarts || []);
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

  return (
    <div className="w-full shadow-xl fixed bg-white z-20 top-0 left-0 right-0">
      <nav className="container mx-auto flex justify-between items-center py-3 md:px-20 shadow-sm">
        {/* Logo */}
        <Link href={"/"}>
          <Image width={200} height={200} alt="logo" src={Logo} />
        </Link>

        {/* Search Input */}
        <div className="hidden md:flex border p-2 rounded-lg bg-gray-200 w-96">
          <input
            type="text"
            className="bg-transparent w-full outline-none text-orange-500"
            placeholder="Search"
          />
          <Search className="text-orange-500" />
        </div>

        {isSignedIn ? (
          <Sheet>
            <SheetTrigger asChild>
              <div className="flex gap-2 items-center">
                <span className="flex gap-2 items-center">
                  <ShoppingCart />
                  <label
                    className="py-1 px-3 rounded-full bg-slate-200"
                    aria-label={`Cart items: ${
                      cart && cart.length ? cart.length : 0
                    }`}
                  >
                    {isLoading ? (
                      <span className="loader">...</span>
                    ) : (
                      cart?.length
                    )}
                  </label>
                </span>
                <UserButton />
              </div>
            </SheetTrigger>
            <SheetContent className=" max-h-screen">
              <SheetHeader>
                <SheetTitle className=" font-semibold text-xl">
                  Your Card Items
                </SheetTitle>

                <SheetDescription>
                  <Cart cartData={cart} />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex gap-5">
            <SignInButton mode="modal">
              <Button variant="outline">Login</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>Sign Up</Button>
            </SignUpButton>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
