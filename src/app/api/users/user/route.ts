import { getTokenData } from "@/helpers/getData";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDB } from "@/dbConfig/dbConfig";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const userId = await getTokenData(request);
    const user = await User.findById({ _id: userId }).select("-password");
    return NextResponse.json({ message: "User found", user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
