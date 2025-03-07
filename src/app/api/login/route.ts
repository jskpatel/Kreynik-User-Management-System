import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET as string;

// export const GET = async (req: Request) => {
//   try {
//     await connectToDatabase();

//     const url = new URL(req.url)
//     const email = url.searchParams.get("email");

//     if (!email) {
//       return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 })
//     }

//     const user = await User.findOne({ email })
//     if (!user) {
//       return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
//     }

//     return NextResponse.json({ success: true, data: user }, { status: 200 })

//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   } catch (error) {
//     return NextResponse.json({ success: false, error: "Error fetching user" }, { status: 500 })
//   }
// }

export const POST = async (req: Request) => {
  try {

    await connectToDatabase();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
    }

    const user = await User.findOne({ email })
    console.log("login user ==> ", user)
    if (!user) {
      return NextResponse.json({ success: false, error: "Email: Invalid email or password" }, { status: 401 })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return NextResponse.json({ success: false, error: "PWD: Invalid email or password" }, { status: 401 })
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        type: user.type
      },
      SECRET_KEY,
      {
        expiresIn: "1d"
      }
    )

    return NextResponse.json({ success: true, token }, { status: 200 })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ success: false, error: "BE: Login failed" }, { status: 500 })
  }
}