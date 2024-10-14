'use server';
import { Fragment } from 'react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ShareIcon } from '@heroicons/react/24/outline';
import { revalidatePath } from 'next/cache';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

export default async function Page({ params }) {
  const username = params['username'];
  const token = cookies().get('token')?.value;

  const me = await fetch(`${process.env.API_ORIGIN}/me`, { headers: { authorization: `Bearer ${token}` } }).then(res => res.json());
  const url = new URL(`/users/${username}`, process.env.API_ORIGIN);
  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    return redirect('/login');
  }

  if (response.status === 404) {
    return notFound();
  }

  const result = await response.json();
  console.log('wefijweofiwe', result);
  return (
    <div className="h-full pt-3.5 bg-gray-100">
      <div className="mx-3.5 p-3 bg-white rounded-[10px]">
        <div className="flex justify-between">
          <div>
            <p className="text-[20px] font-bold">{result.username}</p>
            <p className="text-[14px] text-gray-300">{result.name}</p>
          </div>
          <img className="w-16 h-16 object-cover" width={64} height={64} src={result.avatarUrl} alt="" />
        </div>

        <p className="whitespace-pre">{result.biography}</p>

        <div className="mt-14 flex gap-1.5 text-[14px] font-semibold">
          {me.username === result.username
            ? (
                <Fragment>
                  <Link href="/profile" className="flex-1 py-2 text-center border border-gray-100 rounded-[5px]">프로필
                    수정</Link>
                  <Link href="/categories" className="flex-1 py-2 text-center border border-gray-100 rounded-[5px]">카테고리
                    관리</Link>
                  <button className="px-4 border border-gray-100 rounded-[5px]"><ShareIcon className="size-4"/>
                  </button>
                </Fragment>
              )
            : <Fragment>

                {result.isFollowing
                  ? (
                      <form
                        className="flex-1"
                        action={async () => {
                          'use server';
                          const result = await fetch(`${process.env.API_ORIGIN}/users/${username}/unfollow`, {
                            method: 'PUT',
                            headers: {
                              authorization: `Bearer ${token}`,
                            },
                          }).then(res => res.json());
                          revalidatePath('/users/[username]');
                        }}>
                        <button
                          type="submit"
                          className="w-full py-2 text-center border border-gray-100 rounded-[5px] flex items-center justify-center"
                        >
                          팔로잉
                          <ChevronDownIcon className="size-3" />
                        </button>
                      </form>
                    )
                  : (
                      <form
                        className="flex-1"
                        action={async () => {
                          'use server';
                          const result = await fetch(`${process.env.API_ORIGIN}/users/${username}/follow`, {
                            method: 'PUT',
                            headers: {
                              authorization: `Bearer ${token}`,
                            },
                          }).then(res => res.json());
                          revalidatePath('/users/[username]');
                        }}>
                        <button
                          type="submit"
                          className="w-full py-2 text-center border border-gray-100 rounded-[5px]"
                        >
                          팔로우
                        </button>
                      </form>
                    )}
              </Fragment>

          }
        </div>
      </div>
    </div>
  )
  ;
}
