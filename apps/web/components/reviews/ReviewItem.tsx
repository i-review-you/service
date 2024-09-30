import Link from "next/link";
import dayjs from "dayjs";

import ReviewActions from "./ReviewActions";
import ReviewContents from "./ReviewContents";
import ReviewImages from "./ReviewImages";
import { reviewDataCamel } from "../../types/review";
import ReviewHeader from "./ReviewHeader";

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
