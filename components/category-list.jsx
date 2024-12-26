"use client";

import globalApi from "@/app/_utils/global-api";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const CategoryList = ({ selectedCategory, onSelectCategory }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const listRef = useRef(null);

  // Fetch category list
  const getCategoryList = async () => {
    setIsLoading(true);
    try {
      const res = await globalApi.GetCategory();
      setCategoryList(res.categories || []);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Handle horizontal scroll
  const handleScroll = (direction) => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: direction === "right" ? 200 : -200,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <div className="container mt-10 relative mx-auto">
      {/* Left Scroll Button */}
      <ArrowLeftCircle
        onClick={() => handleScroll("left")}
        className="absolute -left-10 top-9 bg-gray-500 rounded-full text-white h-8 w-8 cursor-pointer"
      />

      {/* Category List */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide" ref={listRef}>
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="w-28 h-24 min-w-[100px] cursor-pointer bg-slate-200 rounded-lg animate-pulse relative"
              ></div>
            ))
          : categoryList.map((category) => (
              <div
                key={category?.id}
                onClick={() => onSelectCategory(category?.slug)}
                className={`flex flex-col items-center gap-2 border p-3 rounded-xl min-w-28 hover:border-red-500 hover:bg-orange-50 cursor-pointer group ${
                  selectedCategory === category?.slug &&
                  "border-red-500 bg-orange-50"
                }`}
              >
                <Image
                  src={category?.icon?.url || "/default-icon.png"} // Fallback for missing icon
                  alt={category?.name || "Category Icon"}
                  className="group-hover:scale-110 transition-all duration-150"
                  width={45}
                  height={45}
                />
                <h1 className="group-hover:text-red-500 text-sm font-bold">
                  {category?.name}
                </h1>
              </div>
            ))}
      </div>

      {/* Right Scroll Button */}
      <ArrowRightCircle
        onClick={() => handleScroll("right")}
        className="absolute -right-10 top-9 bg-gray-500 rounded-full text-white h-8 w-8 cursor-pointer"
      />
    </div>
  );
};

export default CategoryList;
