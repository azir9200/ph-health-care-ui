/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";
import { UserInfo } from "@/types/user.interface";
import { UserRole } from "@/lib/auth-utils";

// Extend JWT Payload so TypeScript knows your fields
interface MyJwtPayload extends JwtPayload {
  id?: string;
  name?: string;
  email: string;
  role: UserRole;
}

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const accessToken = await getCookie("accessToken");
    console.log("get userInfo", accessToken);

    if (!accessToken) return null;

    const verifiedToken = jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string
    ) as MyJwtPayload;

    if (!verifiedToken) return null;

    const userInfo: UserInfo = {
      id: verifiedToken.id,
      name: verifiedToken.name || "Unknown User",
      email: verifiedToken.email,
      role: verifiedToken.role,
    };

    return userInfo;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};
