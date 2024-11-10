'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function createReviewAction(_: any, formData: FormData) {
  const title = formData.get('title')?.toString();
  const content = formData.get('content')?.toString();
  const categoryId = formData.get('categoryId')?.toString();
  const visibility = formData.get('visibility')?.toString();
  const rating = formData.get('rating')?.toString();
  const tags = formData.get('tags')?.toString();
  const links = formData.get('links')?.toString();
  const imageIds = formData.getAll('images[][object_id]');
  const imageUrls = formData.getAll('images[][url]');

  if (!title || !content || !categoryId || !visibility || !rating) {
    return {
      status: false,
      error: '필수 필드를 모두 입력해 주세요.',
    };
  }

  const data = {
    title,
    content,
    categoryId: parseInt(categoryId),
    visibility,
    rating,
    tags: tags.split(' '),
    images: imageIds.map((id, idx) => ({
      object_id: id,
      url: imageUrls[idx],
    })),
  };

  try {
    const token = cookies().get('token')?.value;
    const url = new URL('/reviews', process.env.API_ORIGIN);
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!result.ok) {
      throw new Error(result.statusText);
    }
    revalidatePath('/reviews');
    return {
      status: true,
      error: '리뷰 작성에 성공했습니다.',
    };
  } catch (err) {
    return {
      status: false,
      error: `리뷰 작성에 실패했습니다. ${err}`,
    };
  }
}
