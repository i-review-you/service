"use client";

import { useEffect, useRef, useState } from "react";

export default function ReviewContents({ contents }: { contents: string }) {
  const [isEllipsed, setIsEllipsed] = useState(false);
  const commentRef = useRef<HTMLParagraphElement>(null);
  const originalCommentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!originalCommentRef.current || !commentRef.current) return;
    const { clientHeight: originalHeight } = originalCommentRef.current;
    const { clientHeight: commentHeight } = commentRef.current;
    if (commentHeight > 48) setIsEllipsed(originalHeight !== commentHeight);
  }, []);

  return (
    <div>
      <p ref={originalCommentRef} className="hidden">
        {contents}
      </p>
      <p
        ref={commentRef}
        className={`${
          isEllipsed ? "line-clamp-2" : ""
        } transition-all font-medium`}
      >
        {contents}
      </p>
      {isEllipsed && (
        <button
          onClick={() => setIsEllipsed((prev) => !prev)}
          className="text-gray-500 mt-2 font-medium"
        >
          {isEllipsed ? "더보기" : "접기"}
        </button>
      )}
    </div>
  );
}
