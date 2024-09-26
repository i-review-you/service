import Link from "next/link";
import dayjs from "dayjs";

import {
  StarIcon,
  UserCircleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";

import ReviewActions from "./ReviewActions";
import ReviewContents from "./ReviewContents";
import ReviewImages from "./ReviewImages";
import { reviewDataCamel } from "../../types/review";
import ReviewEditModal from "./ReviewEditModal";

function ReviewHeader({
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
      <div>
        {/* 내 리뷰때만 보이게 */}
        <EllipsisHorizontalIcon className="size-6 cursor-pointer" />
        <ReviewEditModal reviewId={reviewId} />
      </div>
    </div>
  );
}

function ReviewTitle({
  title,
  createdAt,
}: {
  title: string;
  createdAt: string;
}) {
  return (
    <div className="flex justify-between">
      <h3 className="font-bold">{title}</h3>
      <p>{dayjs(createdAt).format("YYYY.MM.DD")}</p>
    </div>
  );
}

function ReviewTags({ tags }: { tags?: string[] }) {
  if (!tags) return;
  return (
    <div className="flex gap-2 pb-2">
      {tags.map((tag, i) => (
        <Link key={i} href={`/reviews?tag=${tag}`} className="text-primary">
          {`#${tag}`}
        </Link>
      ))}
    </div>
  );
}

export default function ReviewItem({
  id,
  userId,
  categoryId,
  title,
  content,
  rating,
  visibility,
  createdAt,
  updatedAt,
  deletedAt,
}: reviewDataCamel) {
  return (
    <div className="flex flex-col justify-between gap-10 rounded-lg border border-gay-200 p-4 mb-4">
      <div>
        <ReviewHeader userId={userId} rating={rating} reviewId={id} />
        <ReviewImages />
        <ReviewTitle title={title} createdAt={createdAt} />
        <ReviewContents contents={content} />
      </div>
      <div>
        <ReviewTags />
        <ReviewActions reviewId={id} title={title} />
      </div>
    </div>
  );
}
