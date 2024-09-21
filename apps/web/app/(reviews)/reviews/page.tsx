import React from "react";
import ReviewItem from "../../../components/reviews/ReviewItem";
import ReviewFilter from "../../../components/reviews/ReviewFilter";

export default function Page() {
  return (
    <div>
      <ReviewFilter />
      <ReviewItem />
    </div>
  );
}
