/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getTokenData = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.SECRET_TOKEN!);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error("Error while getting token data", error.message);
  }
};
