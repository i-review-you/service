import { cookies } from 'next/headers';
import ReviewFilterCheckbox from './ReviewFilterCheckbox';
import ReviewFilterSelect from './ReviewFilterSelect';

export default async function ReviewFilter() {
  const token = cookies().get('token')?.value;

  const response = await fetch('http://localhost:3000/categories', {
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
