import React from "react";
import { CategoryProps } from "./page";

interface MappingCategoriesProps {
  categories: CategoryProps[];
}

export default function MappingCategories({
  categories,
}: MappingCategoriesProps) {
  return (
    <div>
      {categories.map((category) => (
        <div
          key={category.id}
          className={`flex items-center justify-between py-2 ${
            category.id === categories.length
              ? "border-none"
              : "border-b border-b-gray-300"
          }`}
        >
          <p>{category.name}</p>
          <p className="text-gray-300">{">"}</p>
        </div>
      ))}
    </div>
  );
}
