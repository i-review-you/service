"use client";

import { useQueryParams } from "../../hooks/useQueryParams";
import { categoriesDataSnake } from "../../types/categories";

export default function ReviewFilterSelect({
  categories,
}: {
  categories: categoriesDataSnake[];
}) {
  const { selectedCategory, onChangeCategory } = useQueryParams();
  return (
    <>
      <select value={selectedCategory} onChange={onChangeCategory}>
        <option value={""}>전체</option>
        {categories.length > 0 &&
          categories.map((category) => (
            <option value={category.id}>{category.name}</option>
          ))}
      </select>
    </>
  );
}
