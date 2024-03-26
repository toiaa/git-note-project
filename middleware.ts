import { getSession } from "next-auth/react";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const requestForNextAuth = {
    headers: {
      cookie: request.headers.get("cookie"),
    },
  };
  // @ts-expect-error eslint-disable-next-line
  const session = await getSession({ req: requestForNextAuth });

  if (
    !session?.user &&
    !request.url.includes("login") &&
    !request.url.includes("signup")
  ) {
    console.log(session?.user, "session");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    session?.user &&
    session?.user.onboardingCompleted === false &&
    !request.url.includes("onboarding")
  )
    return NextResponse.redirect(new URL("/onboarding", request.url));

  if (
    session?.user &&
    session?.user.onboardingCompleted === true &&
    request.url.includes("onboarding")
  )
    return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
