"use server";

import { FieldType } from "@/app/(auth)/login/component/LoginForm";
import { cookies } from "next/headers";

export const login = async (data: FieldType) => {
  const cookieStore = cookies();
  const payload = {
    email: data.email,
    password: data.password,
  };
  const res = await fetch(`${process.env.BASE_URL}/auth/sign-in`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await res.json();

  if (result.success) {
    cookieStore.set("token", result.data.accessToken);
  }

  return result;
};
