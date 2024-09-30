"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { deleteReviewAction } from "../../action/deleteReviewAction";

export default function ReviewEditModal({ reviewId }: { reviewId: number }) {
  const [state, formAction, isPending] = useFormState(deleteReviewAction, {});

  return (
    <form action={formAction}>
      <input type="text" name="reviewId" value={reviewId} hidden readOnly />
      <Link href={`/write?id=${reviewId}`}>수정</Link>
      <button type="submit" disabled={isPending}>
        삭제
      </button>
    </form>
  );
}
