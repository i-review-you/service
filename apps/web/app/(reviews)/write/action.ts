"use server";

import { revalidatePath } from "next/cache";

export async function createReviewAction(_: any, formData: FormData) {
  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();

  console.log("formData", formData);

  if (!title && !content) {
    return {
      status: false,
      error: "내용을 입력해주세요.",
    };
  }

  try {
    const result = await fetch(`http://localhost:3000/reviews`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    if (!result.ok) {
      throw new Error(result.statusText);
    }

    return {
      status: true,
      error: "리뷰 작성에 성공했습니다.",
    };
  } catch (err) {
    return {
      status: false,
      error: `리뷰 작성에 실패했습니다. ${err}`,
    };
  }
}
