"use server";

import request from "@/utils/axios";
import { redirect } from "next/navigation";
import { setCookies } from "@/lib/cookies";
import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
  try {
    const res: any = await request.post("/auth/signin", formData);
    return { status: "success", data: res };
  } catch (error: any) {
    return { status: "error", data: error?.data };
  }
}

export async function googleRedirect() {
    return redirect(`${process.env.BASE_BACKEND_URL}/auth/google`);
  }
  interface trustedServiceReturn<T> {
    status: "success" | "error";
    message?: string;
    data?: T;
  }

  export async function signupAction(formData: FormData) {
    try {
      const res: any = await request.post("/auth/signup", formData);
      return { status: "success", data: res };
    } catch (error: any) {
      return { status: "error", data: error?.data };
    }
  }  

  export async function verificationAction(
    payload: { token: string },
    id: string,
  ) {
    try {
      const res: any = await request.post(`/auth/verify-token/${id}`, payload); // Send JSON
      return { status: "success", data: res?.data };
    } catch (error: any) {
      return { status: "error", data: error?.response?.data };
    }
  }

  export async function resendTokenAction(email: string) {
    try {
      const res: any = await request.post(`/auth/resend-token`, { email }); // Send email for token resend
      return { status: "success", data: res?.data };
    } catch (error: any) {
      return { status: "error", data: error?.response?.data };
    }
  }
