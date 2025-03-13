import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export const POST = async (req: Request) => {
  try {
    await connectToDatabase();

    const { email, password, fname, lname, age, type } = await req.json();

    if (!email || !password || !fname || !lname) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const isExist = await User.findOne({ email });
    if (isExist) {
      return NextResponse.json({ success: false, error: "User already exists" }, { status: 409 })
    }

    const newUser = await User.create({ email, age, fname, lname, password, type })
    await newUser.save();

    return NextResponse.json({ success: true, data: newUser, message: "User registered successfully!" }, { status: 201 })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create user" }, { status: 500 })
  }
}