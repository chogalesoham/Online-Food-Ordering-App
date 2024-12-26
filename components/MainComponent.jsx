"use client";

import React, { useState } from "react";
import CategoryList from "./category-list";
import BusinessList from "./business-list";

const MainComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div>
      <CategoryList
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <BusinessList selectedCategory={selectedCategory} />
    </div>
  );
};

export default MainComponent;
