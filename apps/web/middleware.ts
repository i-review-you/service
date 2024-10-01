import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // 요청에서 쿠키 가져오기
  const token = req.cookies.get('token');

  // 1. / 경로 접근 처리
  if (req.nextUrl.pathname === '/') {
    if (!token) {
      // 쿠키가 없으면 로그인 페이지로 내부적으로 rewrite (URL은 /로 유지)
      return NextResponse.rewrite(new URL('/login', req.url));
    } else {
      // 쿠키가 있으면 리뷰 페이지로 내부적으로 rewrite (URL은 /로 유지)
      return NextResponse.rewrite(new URL('/reviews', req.url));
    }
  }

  // 2. /reviews 경로 접근 처리
  if (req.nextUrl.pathname.startsWith('/reviews') && !token) {
    // /reviews에 접근하는데 쿠키가 없으면 로그인 페이지로 내부적으로 rewrite (URL은 /로 유지)
    return NextResponse.rewrite(new URL('/login', req.url));
  }

  // 3. 요청을 그대로 통과시킴
  return NextResponse.next();
}

// middleware가 적용될 경로 설정
export const config = {
  matcher: ['/', '/reviews'], // /와 /reviews 경로에 대해 미들웨어 실행
};
