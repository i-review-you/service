import React from 'react';
import axios from 'axios';
import ReviewItem from '../../../../components/reviews/ReviewItem';
import { cookies } from 'next/headers';

async function getReviewData(id: string) {
  try {
    const token = cookies().get('token')?.value;

    if (!token) {
      throw new Error('토큰 없음');
    }

    const response = await axios.get(`http://localhost:3000/reviews/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  catch (error) {
    console.error('리뷰 데이터를 불러오는 중 오류:', error);
    throw new Error('리뷰 데이터를 가져오지 못했습니다.');
  }
}

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const review = await getReviewData(id);

  if (!review) {
    return <div>리뷰를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <ReviewItem {...review} />
    </div>
  );
}
