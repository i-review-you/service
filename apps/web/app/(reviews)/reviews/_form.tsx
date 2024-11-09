'use client';
import { useState, useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { StarIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { StarIcon as OutlineStarIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Input,
  Textarea,
  FixedActionButton,
  Select,
} from '@i-review-you/react-components';

import { updateReviewAction } from '../../../action/updateReviewAction';
import { createReviewAction } from './action';

export default function Form({ review, categories }) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    review?.id ? updateReviewAction : createReviewAction,
    null,
  );

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (state?.status === true) {
      router.push('/reviews');
    }
  }, [state, router]);

  return (
    <form
      action={formAction}
      className="bg-gray-100 h-full flex flex-col justify-between"
    >
      <div className="px-3.5">
        {review?.id && (
          <input type="hidden" name="reviewId" value={review.id} readOnly />
        )}
        <Select
          name="categoryId"
          options={categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
        />
        <Input
          name="title"
          placeholder="제목을 입력하세요"
          required={true}
          defaultValue={review?.title}
        />
        <Textarea
          name="content"
          placeholder="리뷰를 작성해주세요"
          defaultValue={review?.content}
        />
        {/* <Input name="links" placeholder="링크추가" /> */}
        <div>
          <label className="px-4 py-4 flex bg-white rounded">
            <p className="grow">이미지 업로드</p>
            <PhotoIcon className="w-5" />

            <input type="file" className="hidden" onChange={(event) => {
              const formData = new FormData();
              formData.set('file', event.target.files[0]);

              fetch('/api/reviews/upload-image', {
                method: 'POST',
                body: formData,
              })
                .then((response) => {
                  return response.json();
                }).then((result) => {
                  console.log('fefe', result);
                  setImages((prev) => {
                    const arr = [...prev];
                    arr.push(result);
                    return arr;
                  });
                })
                .finally(() => {
                  event.target.value = '';
                });
            }}/>
          </label>
          {images.length > 0 && (
            <ul className="mt-4 flex gap-3">
              {images.map(image => (
                <li key={image.id}>
                  <input type="hidden" name="images[][object_id]" value={image.id}/>
                  <input type="hidden" name="images[][url]" value={image.url}/>
                  <img className="w-24 h-24" src={image.url} alt=""/>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Input
          name="tags"
          placeholder="태그"
          defaultValue={review?.review_tags.map((tag) => tag.name).join(' ')}
        />
        {/* <Input name="link" placeholder="링크추가" /> */}
        <WriteVisibility defaultValue={review?.visibility} />
        <WriteRating defaultValue={review?.rating} />
      </div>
      <FixedActionButton type="submit" scheme="primary" disabled={isPending}>
        {review?.id ? '리뷰 수정' : '리뷰 작성'}
      </FixedActionButton>
    </form>
  );
}

type visibilityType = 'private' | 'followers';

function WriteVisibility({ defaultValue }: { defaultValue?: visibilityType }) {
  const [visibility, setVisibility] = useState<visibilityType>(
    defaultValue || 'followers'
  );

  return (
    <div className="flex justify-center gap-2 py-4">
      <input name="visibility" type="text" hidden value={visibility} readOnly />
      <Button
        size="small"
        onClick={() => setVisibility('followers')}
        scheme={`${visibility === 'followers' ? 'active' : 'inactive'}`}
      >
        팔로워 공개
      </Button>
      <Button
        size="small"
        onClick={() => setVisibility('private')}
        scheme={`${visibility === 'private' ? 'active' : 'inactive'}`}
      >
        비공개
      </Button>
    </div>
  );
}

function WriteRating({ defaultValue }: { defaultValue?: number }) {
  const [starRating, setStarRating] = useState<number>(defaultValue || 0);
  const MAX_RATING = 5;

  return (
    <div className="py-4 text-center">
      <h3 className="pb-2 text-xl font-bold">만족스러우셨나요?</h3>
      <div className="relative inline-block">
        <input name="rating" hidden type="number" value={starRating} readOnly />
        <div className="flex">
          {Array.from({ length: MAX_RATING })
            .fill(0)
            .map((_, index) => (
              <OutlineStarIcon
                onClick={() => setStarRating(index + 1)}
                key={index}
                className="size-8 text-primary"
              />
            ))}
        </div>
        <div className="absolute top-0 left-0 flex">
          {Array.from({ length: starRating })
            .fill(0)
            .map((_, index) => (
              <StarIcon
                onClick={() => setStarRating(index + 1)}
                key={index}
                className="size-8 text-primary"
              />
            ))}
        </div>
      </div>
    </div>
  );
}
