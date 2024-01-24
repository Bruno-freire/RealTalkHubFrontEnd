"use server"

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { IUserBase } from "../interfaces/IUser";
import { redirect } from "next/navigation";
import api from "./api";

export async function singInAuthentication(
    prevState: string | undefined,
    formData: FormData,
  ) {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          case 'CallbackRouteError':
            return 'Invalid credentials'
          default:
            return 'Something went wrong.';
        }
      }
    throw error;
  }
}

export async function register(prevState: string | IUserBase | undefined, formData: FormData) {
    try {
        await api.post("/users", {
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password")
        });

      } catch (error: any) {
        return `${error.message}`
      }

      const email = encodeURIComponent(formData.get("email") as string);
      const password = encodeURIComponent(formData.get("password") as string);
      const queryString = `email=${email}&password=${password}`;

      redirect(`/auth/login?${queryString}`);
}