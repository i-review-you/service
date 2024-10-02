"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function fetchLikesAction(reviewId: number) {
  try {
    const likesResponse = await fetch(
      `http://localhost:3000/review-like/${reviewId}`,
      {
        next: { tags: ["reviews-like"] },
      }
    );
    if (!likesResponse.ok) {
      return 0;
    }

    const likesData = await likesResponse.json();

    return likesData.likeCount;
  } catch (err) {
    return 0;
  }
}

export async function toggleLikesAction(reviewId: number) {
  const token = cookies().get("token")?.value;

  if (!token) {
    return {
      status: false,
      error: "토큰이 없습니다.",
    };
  }

  try {
    const toggleResponse = await fetch(
      `http://localhost:3000/review-like/${reviewId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!toggleResponse.ok) {
      return {
        status: false,
        error: "실패했습니다.",
      };
    }

    const toggleData = await toggleResponse.json();
    revalidateTag("reviews-like");

    return {
      isLiked: toggleData.isLiked,
      status: true,
      message: "성공했습니다.",
    };
  } catch (err) {
    return {
      status: false,
      error: `실패했습니다. ${err}`,
    };
  }
}
