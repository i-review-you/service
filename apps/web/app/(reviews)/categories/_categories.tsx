'use client';

import { lazy, useState } from 'react';
import { Button } from '@i-review-you/react-components';

const FormModal = lazy(() => import('./_form-modal'));
export default function Form({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // 새로 생성하는 경우 id가 없어서 임시적으로 uid를 만들어줌
  const [_categories, setCategories] = useState(categories.map((c, idx) => ({ ...c, uid: idx + 1 })));

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="px-3">
        <div className="mt-4 flex justify-end">
          {selectedCategory
            ? (
                <>
                  <Button size="small" onClick={() => setIsEditing(true)}>수정</Button>
                  <form>
                    <Button type="submit" size="small">삭제</Button>
                  </form>
                </>
              )
            : (
                <button
                  type="button"
                  onClick={() => {
                    setCategories((prev) => {
                      const arr = [...prev];
                      arr.push({
                        uid: prev.length + 1,
                        id: null,
                        name: '새로운 카테고리',
                        visibility: 'private',
                      });
                      return arr;
                    });
                  }}
                >
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17.25 2.25C17.25 1.00736 16.2426 0 15 0C13.7574 0 12.75 1.00736 12.75 2.25V12.75H2.25C1.00736 12.75 0 13.7574 0 15C0 16.2426 1.00736 17.25 2.25 17.25L12.75 17.25V27.75C12.75 28.9926 13.7574 30 15 30C16.2426 30 17.25 28.9926 17.25 27.75V17.25L27.75 17.25C28.9926 17.25 30 16.2426 30 15C30 13.7574 28.9926 12.75 27.75 12.75H17.25V2.25Z"
                      fill="#17B16B"
                    />
                  </svg>
                </button>
              )}
        </div>

        <div className="mt-5 border">
          {(Array.isArray(_categories) && _categories.length > 0)
            ? (
                <ul className="">
                  {_categories.map((category, idx) => (
                    <li
                      key={`category-${category.uid}`}
                      className={selectedCategory?.uid === category.uid ? 'text-[#17B16B]' : ''}
                      onClick={() => setSelectedCategory(category)}
                    >
                      <input type="hidden" name="category[][id]" value={category.id} />
                      <input type="hidden" name="category[][name]" value={category.name} />
                      <input type="hidden" name="category[][sort_order]" value={idx + 1} />
                      <input type="hidden" name="category[][visibility]" value={category.visibility} />
                      {category.name}
                    </li>
                  ))}
                </ul>
              )
            : (
                <div>
                  카테고리를 추가해보세요
                </div>
              )}
        </div>
      </div>

      {/*<button*/}
      {/*  className="pt-4 block w-full text-center text-[24px] font-black text-white bg-[#17B16B]"*/}
      {/*  style={{*/}
      {/*    paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  저장*/}
      {/*</button>*/}
      {isEditing && (
        <FormModal selectedCategory={selectedCategory} onClose={() => setIsEditing(false)} />
      )}
    </div>
  );
}
