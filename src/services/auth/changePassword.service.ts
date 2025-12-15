"use server";

import { zodValidator } from "@/lib/zodValidator";
import { changePasswordSchema } from "@/zod/changePassword.validation";
import { serverFetch } from "@/lib/server-fetch";
import { getCookie } from "./tokenHandlers";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function changePassword(_prevState: any, formData: FormData) {
  const payload = {
    oldPassword: formData.get("oldPassword") as string,
    newPassword: formData.get("newPassword") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  // ✅ Validate
  const validated = zodValidator(payload, changePasswordSchema);

  if (!validated.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validated.errors,
      formData: payload,
    };
  }

  try {
    const accessToken = await getCookie("accessToken");

    if (!accessToken) {
      throw new Error("User not authenticated");
    }

    const response = await serverFetch.post("/auth/change-password", {
      body: JSON.stringify({
        oldPassword: payload.oldPassword,
        newPassword: payload.newPassword,
      }),
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log("change password service", result);
    if (!result.success) {
      throw new Error(result.message || "Password change failed");
    }

    return {
      success: true,
      message: "Password changed successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}
