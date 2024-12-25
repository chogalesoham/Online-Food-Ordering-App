"use client";

import globalApi from "@/app/_utils/global-api";
import { Search } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

const SearchBar = () => {
  const params = useSearchParams();
  const [category, setCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [restaurantResult, setRestaurantResult] = useState([]);
  const [input, setInput] = useState("");
  const [businessList, setBusinessList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const inputRef = useRef(null);
  const resultsListRef = useRef(null);

  useEffect(() => {
    const categoryParam = params?.get("category") || "all";
    setCategory(categoryParam);
    fetchBusinessList(categoryParam);
  }, [params]);

  const fetchBusinessList = async (category_) => {
    setIsLoading(true);
    try {
      const res = await globalApi.GetBusiness(category_);
      setBusinessList(res?.restaurants || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch business list:", error);
      setIsLoading(false);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    setSelectedIndex(-1); // Reset the selected index

    if (value.trim() === "") {
      setRestaurantResult([]);
      return;
    }

    const filteredResults = businessList.filter((business) =>
      business.name.toLowerCase().includes(value.toLowerCase())
    );

    setRestaurantResult(filteredResults);
  };

  const handleKeyDown = (e) => {
    if (restaurantResult.length === 0) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => {
        const newIndex = (prev + 1) % restaurantResult.length;
        scrollToItem(newIndex);
        return newIndex;
      });
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => {
        const newIndex =
          prev === -1 || prev === 0 ? restaurantResult.length - 1 : prev - 1;
        scrollToItem(newIndex);
        return newIndex;
      });
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        const selectedRestaurant = restaurantResult[selectedIndex];
        window.location.href = `/restaurant/id=${selectedRestaurant?.id}`;
      }
    }
  };

  const scrollToItem = (index) => {
    if (!resultsListRef.current) return;

    const list = resultsListRef.current;
    const item = list.children[index];
    if (item) {
      const itemTop = item.offsetTop;
      const itemBottom = itemTop + item.offsetHeight;
      const listScrollTop = list.scrollTop;
      const listHeight = list.clientHeight;

      if (itemTop < listScrollTop) {
        // Scroll up to make the item visible
        list.scrollTop = itemTop;
      } else if (itemBottom > listScrollTop + listHeight) {
        // Scroll down to make the item visible
        list.scrollTop = itemBottom - listHeight;
      }
    }
  };

  return (
    <div
      className="relative w-full md:w-96 mx-auto"
      onKeyDown={handleKeyDown}
      tabIndex={0} // Ensure the container is focusable for keyboard events
    >
      <div className="flex items-center border p-2 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-orange-500">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          type="text"
          className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-400"
          placeholder="Search for restaurants"
        />
        <Search className="text-gray-500" />
      </div>
      {isLoading && (
        <div className="absolute top-full left-0 w-full bg-white border rounded-lg mt-2 shadow-lg z-10 p-2 text-center text-gray-500">
          Loading...
        </div>
      )}
      {!isLoading && input.trim() !== "" && restaurantResult.length > 0 && (
        <SearchResultsList
          restaurantResult={restaurantResult}
          selectedIndex={selectedIndex}
          resultsListRef={resultsListRef}
        />
      )}
      {!isLoading && input.trim() !== "" && restaurantResult.length === 0 && (
        <div className="absolute top-full left-0 w-full bg-white border rounded-lg mt-2 shadow-lg z-10 p-2 text-center text-gray-500">
          No results found
        </div>
      )}
    </div>
  );
};

const SearchResultsList = ({
  restaurantResult,
  selectedIndex,
  resultsListRef,
}) => {
  return (
    <div
      ref={resultsListRef}
      className="absolute top-full left-0 w-full max-h-80 overflow-y-auto scrollbar-hide bg-white border rounded-lg mt-2 shadow-lg z-10"
    >
      {restaurantResult.map((result, index) => (
        <Link key={result.id} href={`/restaurant/id=${result?.id}`}>
          <div
            className={`p-2 cursor-pointer text-gray-800 transition duration-150 ease-in-out ${
              selectedIndex === index ? "bg-orange-100" : "hover:bg-orange-100"
            }`}
          >
            {result.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchBar;
