import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
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

export const GET = async (req: Request) => {
  try{
    await connectToDatabase();

    const url = new URL(req.url)
    const email = url.searchParams.get("email");

    if (email) {
      // Fetch user by email
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: user }, { status: 200 });
    } else {
      // Fetch all users
      const users = await User.find({});
      return NextResponse.json({ success: true, data: users }, { status: 200 });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch(error){
    return NextResponse.json({success: false, error: "Failed to get data"}, {status: 500})
  }
}


export const DELETE = async (req: Request) => {
  try {
    
    await connectToDatabase();

    const param = new URL(req.url)
    const email = param.searchParams.get("email")
    // const {email} = await req.json();
    console.log("BE Email ", email)

    if(!email){
      return NextResponse.json({success: false, error: "Email is required"}, {status: 404})
    }

    const user = await User.findOne({email})
    console.log(user)
    if(!user){
      return NextResponse.json({success: false, error: "User not found"}, {status: 404})
    }

    await User.deleteOne({email})

    return NextResponse.json({success: true, error: "User deleted successfully"}, {status: 200})

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({success: false, error: "Failed to delete user"}, {status: 500})
  }
}