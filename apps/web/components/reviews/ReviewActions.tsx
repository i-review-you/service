"use client";
import { HandThumbUpIcon, LinkIcon } from "@heroicons/react/24/solid";
import {
  HandThumbUpIcon as OutlineHandThumbUpIcon,
  ArrowUpOnSquareIcon,
} from "@heroicons/react/24/outline";

interface ReviewActionProps {
  reviewId: number;
  title: string;
  likes?: number;
  link?: string;
}

export default function ReviewActions({
  likes,
  link,
  reviewId,
  title,
}: ReviewActionProps) {
  const handleClikLike = () => {};

  const handleClikShare = async () => {
    const shareData = {
      title,
      text: `${title} 리뷰`,
      url: `http://localhost:5173/reviews/${reviewId}`,
    };
    try {
      await navigator.share(shareData);
      console.log("Share");
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  };

  return (
    <div className="flex justify-between">
      <div onClick={handleClikLike} className="flex cursor-pointer">
        <OutlineHandThumbUpIcon className="size-6" />
        {/* <HandThumbUpIcon className="size-6" /> */}
        도움돼요
        {likes}
      </div>
      <div className="flex gap-2">
        {link && (
          <div className="flex items-center cursor-pointer">
            <LinkIcon className="size-4" />
            링크
          </div>
        )}
        <div
          onClick={handleClikShare}
          className="flex items-center cursor-pointer"
        >
          <ArrowUpOnSquareIcon className="size-4" />
          공유
        </div>
      </div>
    </div>
  );
}
