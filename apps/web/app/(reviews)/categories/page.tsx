'use server';
import {cookies} from "next/headers";

export default async function Page() {
  const token = cookies().get('token')?.value;
  const response = await fetch('http://localhost:3000/categories', {
    headers: {
      'authorization': `Bearer ${token}`,
    }
  });
  const categories = await response.json();
  
  return (
    <div>
      <h1>카테고리 목록</h1>
      <ul className="mt-5 border">
        {categories.sort((a, b) => a.sort_order - b.sort_order).map((category) => (
          <li key={`category-${category.id}`}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
}
