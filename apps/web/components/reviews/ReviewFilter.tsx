'use server';
import { cookies } from 'next/headers';
import ReviewFilterCheckbox from './ReviewFilterCheckbox';
import ReviewFilterSelect from './ReviewFilterSelect';

export default async function ReviewFilter() {
  const token = (await cookies()).get('token')?.value;

  const url = new URL('/categories', process.env.API_ORIGIN);
  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const categories = await response.json();

  return (
    <div className="flex justify-between p-4 mb-4 border rounded-lg cursor-pointer border-gay-200">
      <ReviewFilterCheckbox />
      <ReviewFilterSelect categories={categories} />
    </div>
  );
}
