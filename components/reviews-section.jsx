"use client";
import React, { useEffect } from "react";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { Rating as ReactRating } from "@smastrom/react-rating";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import globalApi from "@/app/_utils/global-api";
import { toast } from "sonner";
import ReviewList from "./review-list";

const ReviewsSection = ({ restaurantDetailsData }) => {
  console.log("ReviewsSection Data", restaurantDetailsData);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState();
  const { user } = useUser();
  const [reviewList, setReviewList] = useState([]);

  const handelReviewSubmit = () => {
    const data = {
      email: user?.primaryEmailAddress?.emailAddress,
      profileImage: user?.imageUrl,
      userName: user?.fullName,
      star: rating,
      reviewText: reviewText,
      resId: restaurantDetailsData.id,
    };
    globalApi.AddNewReview(data).then((res) => {
      toast("New Review Added!");
      GetReviews();
      setRating(0);
      setReviewText("");
    });
  };

  const GetReviews = () => {
    globalApi
      .GetRestaurantsReviews(restaurantDetailsData?.id)
      .then((res) => {
        setReviewList(res?.reviews);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  };

  useEffect(() => {
    restaurantDetailsData && GetReviews();
  }, [restaurantDetailsData]);

  return (
    <div className=" grid grid-cols-1 md:grid-cols-3 mt-10 gap-10">
      <div className=" h-[250] flex flex-col gap-2 p-5 border rounded-lg shadow-2xl">
        <h2 className=" font-bold text-lg">Add Your Review</h2>
        <ReactRating
          style={{ maxWidth: 100 }}
          value={rating}
          onChange={setRating}
        />
        <Textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className=" border-gray-400"
        />
        <Button
          onClick={() => handelReviewSubmit()}
          disabled={rating == 0 || !reviewText}
          className={`w-full bg-orange-600 `}
        >
          Submit
        </Button>
      </div>
      <div className="col-span-2">
        <ReviewList reviewList={reviewList} />
      </div>
    </div>
  );
};

export default ReviewsSection;
