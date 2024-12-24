import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenuTab from "./menu-tab";
import ReviewsSection from "./reviews-section";

const RestaurantTab = ({ restaurantDetailsData }) => {
  return (
    <div>
      {restaurantDetailsData ? (
        <Tabs defaultValue="category" className="w-full mt-10">
          <TabsList>
            <TabsTrigger value="category">Category</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="category">
            <MenuTab restaurantDetailsData={restaurantDetailsData} />
          </TabsContent>
          <TabsContent value="about">Change your password here.</TabsContent>
          <TabsContent value="reviews">
            <ReviewsSection restaurantDetailsData={restaurantDetailsData} />
          </TabsContent>
        </Tabs>
      ) : (
        <div className=" flex gap-3 flex-col mt-5">
          <p className="w-[70%] h-[50px] object-cover rounded-xl bg-slate-200 animate-pulse"></p>
          <p className="w-[80%] h-[50px] object-cover rounded-xl bg-slate-200 animate-pulse"></p>
          <p className="w-[90%] h-[30px] object-cover rounded-xl bg-slate-200 animate-pulse"></p>
          <p className="w-[80%] h-[20px] object-cover rounded-xl bg-slate-200 animate-pulse"></p>
          <p className="w-[70%] h-[60px] object-cover rounded-xl bg-slate-200 animate-pulse"></p>
        </div>
      )}
    </div>
  );
};

export default RestaurantTab;
