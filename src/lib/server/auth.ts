import { cookies } from "next/headers";
import { signIn, signUp } from "../requests";
import { SignInData, SignUpData } from "../schemas/auth-schema";
import { User } from "@/types/user";
import { redirect } from "next/navigation";

export const handleSignIn = async (data: SignInData) => {
  const response = await signIn(data);

  if (response.data) {
    (await cookies()).set({
      name: process.env.NEXT_PUBLIC_AUTH_KEY as string,
      value: response.data.access_token,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }

  return response;
};

export const handleSignUp = async (data: SignUpData) => {
  const response = await signUp(data);

  if (response.data) {
    (await cookies()).set({
      name: process.env.NEXT_PUBLIC_AUTH_KEY as string,
      value: response.data.access_token,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }

  return response;
};

export const handleGetUser = async () => {
  const authCookies = (await cookies()).get(
    process.env.NEXT_PUBLIC_AUTH_KEY as string
  )?.value;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/me`,
    {
      headers: {
        Authorization: `Bearer ${authCookies}`,
      },
    }
  );

  const jsonResponse = await response.json();

  const userData = jsonResponse.user;

  if (userData) {
    return userData as User;
  }

  return null;
};

export const handleSignOut = async () => {
  (await cookies()).delete(process.env.NEXT_PUBLIC_AUTH_KEY as string);
  redirect("/auth/signin");
};
