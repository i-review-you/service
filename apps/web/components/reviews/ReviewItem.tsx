import Link from 'next/link';
import dayjs from 'dayjs';

import { reviewDataCamel } from '../../types/review';
import ReviewHeader from './ReviewHeader';
import ReviewContents from './ReviewContents';
import ReviewImages from './ReviewImages';
import ReviewActions from './ReviewActions';
import { fetchLikesAction } from '../../action/likesAction';

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
      <p>{dayjs(createdAt).format('YYYY.MM.DD')}</p>
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

export default async function ReviewItem({
  id,
  author,
  category,
  title,
  content,
  rating,
  visibility,
  createdAt,
  updatedAt,
  images,
}: reviewDataCamel) {
  const likes = await fetchLikesAction(id);

  return (
    <div className="flex flex-col justify-between gap-10 p-4 mb-4 border rounded-lg border-gay-200">
      <div>
        <ReviewHeader user={author} rating={rating} reviewId={id} />
        <ReviewImages />
        {images.length > 0 && (
          <ul className="mt-1 mb-2 flex gap-3 flex-nowrap overflow-x-auto snap-x">
            {images.map(image => (
              <li key={image.id} className="shrink-0">
                <img className="w-24 h-24 object-cover" src={image.url} alt="" />
              </li>
            ))}
          </ul>
        )}
        <ReviewTitle title={title} createdAt={createdAt} />
        <ReviewContents contents={content} />
      </div>
      <div>
        <ReviewTags />
        <ReviewActions reviewId={id} title={title} likes={likes} />
      </div>
    </div>
  );
}
