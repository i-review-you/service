"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateReviewAction(_: any, formData: FormData) {
  const reviewId = formData.get("reviewId")?.toString();
  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();
  const categoryId = formData.get("categoryId")?.toString();
  const visibility = formData.get("visibility")?.toString();
  const rating = formData.get("rating")?.toString();

  if (!title || !content || !categoryId || !visibility || !rating) {
    return {
      status: false,
      error: "필수 필드를 모두 입력해 주세요.",
    };
  }

  const data = {
    title,
    content,
    categoryId: parseInt(categoryId),
    visibility,
    rating,
  };

  try {
    const token = cookies().get("token")?.value;
    const result = await fetch(
      `http://localhost:3000/reviews/${parseInt(reviewId)}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(data),
      }
    );
    if (!result.ok) {
      throw new Error(result.statusText);
    }

    return {
      status: true,
      message: "리뷰 수정에 성공했습니다.",
    };
  } catch (err) {
    return {
      status: false,
      error: `리뷰 수정에 실패했습니다. ${err}`,
    };
  }
}
