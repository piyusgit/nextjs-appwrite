import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    // check if user exists

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          error: "User does not exist",
        },
        {
          status: 400,
        }
      );
    }

    // check if password is correct
    const vaildPassword = await bcryptjs.compare(password, user.password);

    if (!vaildPassword) {
      return NextResponse.json(
        {
          error: "Invalid password",
        },
        {
          status: 400,
        }
      );
    }

    // create token data
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };
    // create token
    const token = await jwt.sign(tokenData, process.env.SECRET_TOKEN!, {
      expiresIn: "1d",
    });

    console.log(token);
    const response = NextResponse.json({
      message: "Logged in successfully",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
