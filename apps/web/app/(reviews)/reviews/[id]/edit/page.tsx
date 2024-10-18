'use server';
import { cookies } from 'next/headers';
import Form from '../../_form';

export default async function Page({ params: { id } }) {
  const token = cookies().get('token')?.value;
  const url = new URL(`/reviews/${id}`, process.env.API_ORIGIN);
  const categoriesUrl = new URL('/categories', process.env.API_ORIGIN);

  const [reviewResponse, categoriesResponse] = await Promise.all([
    fetch(url, { headers: { Authorization: `Bearer ${token}` } }),
    fetch(categoriesUrl, { headers: { Authorization: `Bearer ${token}` } }),
  ]);

  const review = await reviewResponse.json();
  const categories = await categoriesResponse.json();

  return <Form review={review} categories={categories} />;
}
