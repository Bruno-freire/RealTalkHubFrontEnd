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
    console.log(error)
    if (error instanceof AuthError) {
      return `${error.cause?.err?.message}`
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