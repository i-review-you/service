'use server';
import {redirect} from "next/navigation";
import {cookies} from "next/headers";

import Form from './_form';

export default async function Page() {
  const token = cookies().get('token')?.value;

  const response = await fetch('http://localhost:3000/categories', {
    headers: {
      'authorization': `Bearer ${token}`,
    }
  });

  if (response.status === 401) {
    redirect('/login');
  }
  const categories = await response.json();

  return (
    <Form categories={categories} />

  );
}
