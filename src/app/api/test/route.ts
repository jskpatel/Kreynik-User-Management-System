import { connectToDatabase } from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


const ItemSchema = new mongoose.Schema({ name: String }, { collection: "items" });
const Item = mongoose.models.Item || mongoose.model("Item", ItemSchema);

export async function GET() {
  try {
    await connectToDatabase();
    const items = await Item.find({});
    return NextResponse.json({ success: true, data: items, message: "Database connected successfully!" });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message, message: "Database connection failed!" }, { status: 500 });
  }
}
