import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET as string;

const PUBLIC_PATHS = ["/api/login", "/signin", "/signup", "/forgotpassword"]

export const middleware = (req: NextRequest) => {

  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  const token = req.cookies.get("token")?.value || req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    // return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 })
    return NextResponse.redirect(new URL("/login", req.url))
  }

  try {
    jwt.verify(token, SECRET_KEY)
    return NextResponse.next()
    
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url))
  }


  // if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
  //   const token = req.cookies.get("token")?.value || req.headers.get("Authorization")?.split(" ")[1];

  //   if (!token) {
  //     return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 })
  //   }

  //   try {
  //     jwt.verify(token, SECRET_KEY)
  //     return NextResponse.next();

  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   } catch (error) {
  //     return NextResponse.json({ success: false, error: "Invalid token" }, { status: 403 })
  //   }
  // }

  return NextResponse.next();
}









// const pathname = req.nextUrl.pathname;

// if(PUBLIC_PATHS.includes(pathname)){
//   return NextResponse.next()
// }

// const token = req.cookies.get("token")?.value;

// if(!token){
//   return NextResponse.redirect(new URL("/login", req.url))
// }

// try{
//   jwt.verify(token, SECRET_KEY)
//   return NextResponse.next()
// }catch{
//   return NextResponse.redirect(new URL("/login", req.url))
// }