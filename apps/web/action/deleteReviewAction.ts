"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function deleteReviewAction(_: any, formData: FormData) {
  const reviewId = formData.get("reviewId")?.toString();

  try {
    const token = cookies().get("token")?.value;
    const result = await fetch(`http://localhost:3000/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!result.ok) {
      throw new Error(result.statusText);
    }

    revalidateTag("reviews");

    return {
      status: true,
      message: "리뷰 삭제를 성공했습니다.",
    };
  } catch (err) {
    return {
      status: false,
      error: `리뷰 삭제를 실패했습니다. ${err}`,
    };
  }
}
