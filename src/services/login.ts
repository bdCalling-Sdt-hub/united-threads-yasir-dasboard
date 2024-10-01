"use server";

import { cookies } from "next/headers";

export const login = async (data: Record<string, unknown>) => {
  const cookieStore = cookies();
  const payload = {
    email: data.email,
    password: data.password,
  };
  console.log(payload);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign-in`, {
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
