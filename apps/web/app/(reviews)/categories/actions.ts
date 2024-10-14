'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function createCategory(prevState: any, formData: FormData) {
  const token = cookies().get('token')?.value;
  const name = formData.get('name');
  const visibility = formData.get('visibility');

  const url = new URL('/categories', process.env.API_ORIGIN);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      name,
      visibility,
      sort_order: 0,
    }),
  });
  const result = await response.json();
  revalidatePath('/categories');

  return;
}

export async function updateCategory(prevState: any, formData: FormData) {
  const token = cookies().get('token')?.value;

  const id = formData.get('id');
  const name = formData.get('name');
  const visibility = formData.get('visibility');

  const url = new URL(`/categories/${id}`, process.env.API_ORIGIN);
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      name,
      visibility,
    }),
  });
  const result = await response.json();
  revalidatePath('/categories');
  return;
}

export async function deleteCategory(prevState: any, formData: FormData) {
  const token = cookies().get('token')?.value;

  const id = formData.get('id');
  const url = new URL(`/categories/${id}`, process.env.API_ORIGIN);
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 204) {
    revalidatePath('/categories');
    return;
  }
}
