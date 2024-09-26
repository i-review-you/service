import Link from "next/link";
import ReviewActions from "./ReviewActions";
import ReviewContents from "./ReviewContents";
import ReviewImages from "./ReviewImages";
import { reviewData } from "../../types/review";
import {
  StarIcon,
  UserCircleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";

function ReviewHeader({
  username,
  score,
}: {
  username: string;
  score: number;
}) {
  return (
    <div className="flex items-center justify-between pb-2">
      <div className="flex items-center gap-2">
        <Link
          href={"/user/userId"}
          className="flex items-center gap-1 cursor-pointer"
        >
          <UserCircleIcon className="size-8" />
          <span>{username}</span>
        </Link>
        <div className="flex">
          {Array.from({ length: score })
            .fill(0)
            .map((_, index) => (
              <StarIcon key={index} className="size-4 text-main" />
            ))}
          {Array.from({ length: 5 - score })
            .fill(0)
            .map((_, index) => (
              <OutlineStarIcon key={index} className="size-4 text-main" />
            ))}
        </div>
      </div>
      <div>
        {/* 내 리뷰때만 보이게 */}
        <EllipsisHorizontalIcon className="cursor-pointer size-6" />
      </div>
    </div>
  );
}

function ReviewTitle({ title, createAt }: { title: string; createAt: string }) {
  return (
    <div className="flex justify-between">
      <h3 className="font-bold">{title}</h3>
      <p>{createAt}</p>
    </div>
  );
}

function ReviewTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex gap-2 pb-2">
      {tags.map((tag, i) => (
        <Link key={i} href={`/reviews?tag=${tag}`} className="text-main">
          {`#${tag}`}
        </Link>
      ))}
    </div>
  );
}

export default function ReviewItem({
  id,
  username,
  score,
  images,
  title,
  createAt,
  contents,
  tags,
  likes,
  link,
}: reviewData) {
  return (
    <div className="flex flex-col justify-between gap-10 p-4 mb-4 border rounded-lg border-gay-200">
      <div>
        <ReviewHeader username={username} score={score} />
        <ReviewImages images={images} />
        <ReviewTitle title={title} createAt={createAt} />
        <ReviewContents contents={contents} />
      </div>
      <div>
        <ReviewTags tags={tags} />
        <ReviewActions likes={likes} link={link} reviewId={id} title={title} />
      </div>
    </div>
  );
}
