import React from 'react';
import { cookies } from 'next/headers';
import ReviewFilter from '../../../components/reviews/ReviewFilter';
import ReviewItem from '../../../components/reviews/ReviewItem';
import { reviewDataSnake } from '../../../types/review';
import { convertKeysToCamelCase } from '../../../utils/camelCaseUtil';
import { reviewData } from '../../../types/review';

export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }) {
  const token = cookies().get('token')?.value;
  const result = await fetch(
    `http://localhost:3000/reviews?myReview=${searchParams.myReview}&categoryId=${searchParams.categoryId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['reviews'] },
    }
  );
  const reviewsData = await result.json();
  const reviews: reviewDataSnake[] = reviewsData.reviews;

  return (
    <div>
      <ReviewFilter />
      {reviews.map((review) => (
        <>
          <ReviewItem key={review.id} {...convertKeysToCamelCase(review)} />
        </>
      ))}
    </div>
  );
}
