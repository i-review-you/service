'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  EllipsisHorizontalIcon,
  StarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import { StarIcon as OutlineStarIcon } from '@heroicons/react/24/outline';

import Modal from '../ui/Modal';
import ReviewEditModal from './ReviewEditModal';

export default function ReviewHeader({
  user,
  rating,
  reviewId,
}: {
  user: any;
  rating: number;
  reviewId: number;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  return (
    <div className="flex justify-between items-center pb-2">
      <div className="flex items-center gap-2">
        <Link
          href={`/users/${user.username}`}
          className="flex items-center gap-1 cursor-pointer"
        >
          {user.avatarUrl
            ? (
                <img src={user.avatarUrl} className="size-8" />
              )
            : (

                <UserCircleIcon className="size-8" />
              )}
          <span>{user.name}</span>
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
      <div className="relative">
        {/* 내 리뷰때만 보이게 */}
        <EllipsisHorizontalIcon
          className="size-6 cursor-pointer"
          onClick={toggleModal}
        />
        {isModalOpen && (
          <Modal toggleModal={toggleModal}>
            <ReviewEditModal reviewId={reviewId} />
          </Modal>
        )}
      </div>
    </div>
  );
}
