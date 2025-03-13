import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

const SECRET_KEY = process.env.JWT_SECRET as string;

export const POST = async (req: Request) => {
  try {

    await connectToDatabase();

    const { email, password } = await req.json();
    // const email= "n@kreynik.com";
    // const password= "$2b$10$AIeMWcaGsW3bbVCbg8VpmOsU/OfUeSkYjOTqvg3eIyEdWfD3FW2fK"

    console.log({ email, password })

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
    }

    console.log({ one: 1 })

    const user = await User.findOne({ email })
    console.log({ user })
    if (user.email !== email) {
      return NextResponse.json({ success: false, error: "Email: Invalid email or password" }, { status: 401 })
    }

    // const isMatch = await user.comparePassword(password);
    // console.log({ isMatch })
    // if (!isMatch) {
    //   return NextResponse.json({ success: false, error: "PWD: Invalid email or password" }, { status: 401 })
    // }

    console.log("password ==>> ", password, user.password)
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return NextResponse.json({ success: false, error: "PWD: Invalid email or password" }, { status: 401 })
    }
    console.log("=======isMatch======", { isMatch })

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        type: user.type
      },
      SECRET_KEY,
      {
        expiresIn: "1h"
      }
    )

    const response = NextResponse.json({ success: true, token }, { status: 200 })

    response.cookies.set("token", token, {
      httpOnly: false,
      // sameSite: "lax",
      path: "/"
    })

    return response

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ success: false, error: "BE: Login failed" }, { status: 500 })
  }
}