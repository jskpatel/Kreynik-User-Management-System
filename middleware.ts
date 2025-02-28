import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET as string;

const protectedRoutes = [
  "/api/protected",
  "/api/users"
]

export const middleware = (req: NextRequest) => {
  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    const token = req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({success: false, error:"Unauthorized access"}, {status: 401})
    }

    try {
      jwt.verify(token, SECRET_KEY)
      return NextResponse.next();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return NextResponse.json({success: false, error: "Invalid token"}, {status: 403})
    }
  }

  return NextResponse.next();
}