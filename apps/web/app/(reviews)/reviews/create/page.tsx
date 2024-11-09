'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import Form from '../_form';

export default async function Page() {
  const token = cookies().get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  const url = new URL('/categories', process.env.API_ORIGIN);
  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const categories = await response.json();

  return (
    <>
      <Form categories={categories} />
    </>
  );
}
