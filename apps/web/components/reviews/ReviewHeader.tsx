'use client';

import Link from 'next/link';
import {
  EllipsisHorizontalIcon,
  StarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import { StarIcon as OutlineStarIcon } from '@heroicons/react/24/outline';

import ReviewEditModal from './ReviewEditModal';
import { Modal } from '@i-review-you/react-components';

export default function ReviewHeader({
  userId,
  rating,
  reviewId,
}: {
  userId: string;
  rating: number;
  reviewId: number;
}) {
  return (
    <div className="flex justify-between items-center pb-2">
      <div className="flex items-center gap-2">
        <Link
          href={`/user/${userId}`}
          className="flex items-center gap-1 cursor-pointer"
        >
          <UserCircleIcon className="size-8" />
          <span>{userId}</span>
        </Link>
        <div className="flex">
          {Array.from({ length: rating })
            .fill(0)
            .map((_, index) => (
              <StarIcon key={index} className="size-5 text-primary" />
            ))}
          {Array.from({ length: 5 - rating })
            .fill(0)
            .map((_, index) => (
              <OutlineStarIcon key={index} className="size-5 text-primary" />
            ))}
        </div>
      </div>
      <Modal
        buttonChildren={
          <EllipsisHorizontalIcon className="size-6 cursor-pointer" />
        }
        modalChildren={<ReviewEditModal reviewId={reviewId} />}
      />
    </div>
  );
}
