import Image from "next/image";
import React from "react";
import { Rating as ReactRating } from "@smastrom/react-rating";
import moment from "moment/moment";

const ReviewList = ({ reviewList }) => {
  console.log("Review response:", reviewList);
  return (
    <div className=" flex flex-col gap-5">
      {reviewList
        ? reviewList.map((review, index) => (
            <div
              className=" flex gap-5 items-center border border-orange-400 hover:bg-orange-50 rounded-lg p-5"
              key={index}
            >
              <Image
                src={review?.profileImage}
                alt="profileImage"
                width={50}
                height={50}
                className=" rounded-full"
              />
              <div className="">
                <p className="text-sm line-clamp-2">{review?.reviewText}</p>
                <ReactRating
                  isDisabled={true}
                  style={{ maxWidth: 100 }}
                  value={review?.star}
                />
                <p className="text-sm">
                  <b>{review?.userName}</b> at{" "}
                  {moment(review?.publishedAt).format("DD-MMM-yyyy")}
                </p>
              </div>
            </div>
          ))
        : [1, 2, 3].map((item, index) => (
            <div
              className=" bg-slate-200 h-[63] rounded-lg animate-pulse"
              key={index}
            ></div>
          ))}
    </div>
  );
};

export default ReviewList;
