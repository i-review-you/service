import React from "react";
import axios from "axios";
import ReviewItem from "../../../../components/reviews/ReviewItem";

const mockReviewData = {
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
};

// 백 api 나오면 쓸 예정
async function getReviewData(id: string) {
  try {
    const response = await axios.get(`http://localhost:3000/reviews/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("failed");
  }
}

export default function page({ params: { id } }: { params: { id: string } }) {
  // const review = await getReviewData(id);

  const review = mockReviewData.id.toString() === id ? mockReviewData : null;

  if (!review) {
    return <div>리뷰를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <ReviewItem {...review} />
    </div>
  );
}
