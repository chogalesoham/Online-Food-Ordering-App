"use client";
import Image from "next/image";
import React from "react";
import Logo from "@/public/logo.png";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div className="w-full shadow-xl fixed bg-white z-20 top-0 left-0 right-0">
      <nav className=" container mx-auto flex justify-between items-center py-3 md:px-20 shadow-sm">
        <Image width={200} height={200} alt="logo" src={Logo} />
        <div className=" hidden md:flex border p-2 rounded-lg bg-gray-200 w-96">
          <input
            type="text"
            className=" bg-transparent w-full outline-none text-orange-500"
            placeholder="Search"
          />
          <Search className=" text-orange-500" />
        </div>

        {isSignedIn ? (
          <UserButton />
        ) : (
          <div className=" flex gap-5">
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
