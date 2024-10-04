'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { deleteReviewAction } from '../../action/deleteReviewAction';

export default function ReviewEditModal({ reviewId }: { reviewId: number }) {
  const [state, formAction, isPending] = useActionState(deleteReviewAction, {});

  return (
    <form action={formAction}>
      <input type="text" name="reviewId" value={reviewId} hidden readOnly />
      <Link className="flex items-center gap-2" href={`/write?id=${reviewId}`}>
        <PencilSquareIcon className="w-4 h-4" />
        수정
      </Link>
      <button
        type="submit"
        disabled={isPending}
        className="flex items-center gap-2"
      >
        <TrashIcon className="w-4 h-4" />
        삭제
      </button>
    </form>
  );
}
