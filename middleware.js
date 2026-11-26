import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  if (!url.pathname.endsWith('/')) {
    url.pathname += '/';
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

// Catalogue and blog article URLs resolve first so missing URLs return a direct 404.
export const config = {
  matcher: [
    '/blog', '/categories', '/pages/cart', '/pages/checkout', '/pages/contact-us',
    '/pages/delivery-terms', '/pages/offer', '/pages/payment-terms', '/pages/privacy',
    '/pages/reviews', '/pages/trade-in', '/pages/warranty', '/pages/order/:slug',
  ],
};
