'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Select from '../../../components/ui/Select';

export default async function Categories() {
  const token = cookies().get('token')?.value;

  const url = new URL('/categories', process.env.API_ORIGIN);
  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const categories = await response.json();

  return (
    <Select
      name="categoryId"
      options={categories.map(category => ({ value: category.id, label: category.name }))}
    />
  );
}
