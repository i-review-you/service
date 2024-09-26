import React from "react";
import ReviewFilter from "../../../components/reviews/ReviewFilter";
import ReviewItem from "../../../components/reviews/ReviewItem";
import { reviewData } from "../../../types/review";

export default async function Page() {
  const res = await fetch("http://localhost:3000/reviews");
  const result = await res.json();
  console.log(result);

  const reviewDummy: reviewData[] = [
    {
      id: 1,
      username: "john_doe",
      score: 4,
      images: [
        "/images/no-image.svg",
        "/images/no-image.svg",
        "/images/no-image.svg",
      ],
      title: "Great Product!",
      createAt: "2024-09-18",
      contents:
        "I really enjoyed using this product. It exceeded my expectations in every way. The build quality is excellent, and the performance is top-notch. Highly recommend!",
      tags: ["electronics", "gadgets", "top-rated"],
      likes: 120,
      link: "https://example.com/review/12345",
    },
    {
      id: 2,
      username: "john_doe",
      score: 4,
      images: [
        "/images/no-image.svg",
        "/images/no-image.svg",
        "/images/no-image.svg",
      ],
      title: "Great Product!",
      createAt: "2024-09-18",
      contents:
        "I really enjoyed using this product. It exceeded my expectations in every way. The build quality is excellent, and the performance is top-notch. Highly recommend!",
      tags: ["electronics", "gadgets", "top-rated"],
      likes: 120,
      link: "https://example.com/review/12345",
    },
  ];

  return (
    <div>
      <ReviewFilter />
      {reviewDummy.map((review) => (
        <ReviewItem key={review.id} {...review} />
      ))}
    </div>
  );
}
