import React from 'react';
import { cookies } from 'next/headers';
import ReviewFilter from '../../../components/reviews/ReviewFilter';
import ReviewItem from '../../../components/reviews/ReviewItem';
import { reviewDataSnake } from '../../../types/review';
import { convertKeysToCamelCase } from '../../../utils/camelCaseUtil';

export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }) {
  const token = cookies().get('token')?.value;
  const url = new URL('/reviews', process.env.API_ORIGIN);
  url.searchParams.set('category_id', searchParams.category_id || '');

  const result = await fetch(
    url,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['reviews'] },
    },
  );
  const reviewsData = await result.json();
  const reviews: reviewDataSnake[] = reviewsData.reviews || [];

  return (
    <div>
      <ReviewFilter />
      {reviews.length > 0
        ? (
            reviews.map(review => (
              <ReviewItem key={review.id} {...convertKeysToCamelCase(review)} />
            ))
          )
        : (
            <p>리뷰가 없습니다.</p>
          )}
    </div>
  );
}
