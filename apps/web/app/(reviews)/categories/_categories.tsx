'use client';

import { useState, useActionState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { Button } from '@i-review-you/react-components';

import { createCategory, updateCategory, deleteCategory } from './actions';

export default function Form({ categories }) {
  const formRef = useRef(null);

  const [_categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [createState, create, isCreating] = useActionState(createCategory);
  const [updateState, update, isUpdating] = useActionState(updateCategory);
  const [deleteState, remove, isDeleting] = useActionState(deleteCategory);

  // 새로 생성하는 경우 id가 없어서 임시적으로 uid를 만들어줌
  useEffect(() => {
    setSelectedCategory(null);
    setCategories(categories.map((c, idx) => ({ ...c, uid: idx + 1 })));
  }, [categories]);

  return (
    <div className="flex flex-col min-h-full">
      <div className="px-3.5 grow flex flex-col">
        <div className="flex justify-end gap-3 mt-4">
          {selectedCategory
            ? (
                <>
                  <Button
                    size="small"
                    onClick={() => {
                      setSelectedCategory(null);
                    }}
                  >
                    취소
                  </Button>
                  {selectedCategory.id && (
                    <form
                      action={remove}
                      onSubmit={(event) => {
                        if (!confirm('선택한 카테고리를 삭제합니다')) {
                          event.preventDefault();
                        }
                      }}
                    >
                      <input type="hidden" name="id" value={selectedCategory.id} />
                      <Button
                        type="submit"
                        size="small"
                      >
                        삭제
                      </Button>
                    </form>
                  )}
                </>
              )
            : (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory({
                      id: null,
                      name: '새로운 카테고리',
                      visibility: 'private',
                    });
                  }}
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.25 2.25C17.25 1.00736 16.2426 0 15 0C13.7574 0 12.75 1.00736 12.75 2.25V12.75H2.25C1.00736 12.75 0 13.7574 0 15C0 16.2426 1.00736 17.25 2.25 17.25L12.75 17.25V27.75C12.75 28.9926 13.7574 30 15 30C16.2426 30 17.25 28.9926 17.25 27.75V17.25L27.75 17.25C28.9926 17.25 30 16.2426 30 15C30 13.7574 28.9926 12.75 27.75 12.75H17.25V2.25Z"
                      fill="#17B16B"
                    />
                  </svg>
                </button>
              )}
        </div>

        <div className="mt-5 border rounded-[5px]">
          {Array.isArray(_categories) && _categories.length > 0
            ? (
                <ul className="px-5 py-2 divide-y ">
                  {_categories.map((category, idx) => (
                    <li
                      key={`category-${category.uid}`}
                      className={clsx(
                        'py-2.5',
                        selectedCategory?.uid === category.uid && 'text-[#17B16B]',
                      )}
                      onClick={() => {
                        formRef.current?.reset();
                        setSelectedCategory(category);
                      }}
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>
              )
            : (
                <div>카테고리를 추가해보세요</div>
              )}
        </div>

        {selectedCategory && (
          <form
            ref={formRef}
            id="category-form"
            action={selectedCategory.id ? update : create}
            className="mt-6 shrink-0"
          >
            <legend className="text-lg font-bold mb-2">
              {selectedCategory.id ? '카테고리 수정' : '카테고리 추가'}
            </legend>
            {selectedCategory.id && (
              <input type="hidden" name="id" value={selectedCategory.id} />
            )}
            <input
              name="name"
              className="w-full p-3 border border-gray-100 rounded-[5px]"
              defaultValue={selectedCategory.name}
            />
            <div className="mt-2.5 flex gap-1">
              <label className="flex-1">
                <input
                  className="hidden peer"
                  type="radio"
                  name="visibility"
                  value="followers"
                  defaultChecked={selectedCategory.visibility === 'followers'}
                />
                <div
                  className="text-center border py-3.5 rounded-[10px] font-bold text-gray-300 border-gray-100 peer-checked:text-primary peer-checked:border-primary"
                >
                  팔로워 공개
                </div>
              </label>
              <label className="flex-1">
                <input
                  className="hidden peer"
                  type="radio"
                  name="visibility"
                  value="private"
                  defaultChecked={selectedCategory.visibility === 'private'}
                />
                <div
                  className="text-center border py-3.5 rounded-[10px] font-bold text-gray-300 border-gray-100 peer-checked:text-primary peer-checked:border-primary"
                >
                  나만보기
                </div>
              </label>
            </div>
          </form>
        )}
      </div>

      {selectedCategory && (
        <button
          form="category-form"
          className="pt-4 block w-full text-center text-[24px] font-black text-white bg-primary disabled:bg-gray-300"
          disabled={isCreating || isUpdating}
          style={{
            paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))',
          }}
        >
          저장
        </button>
      )}
    </div>
  );
}
