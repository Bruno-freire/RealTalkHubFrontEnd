import { AuthError } from "next-auth";
import { IUser } from "../interfaces/IUser";
import api from "./api";
import { signIn } from "../../../auth";

export async function Login(email: string, password: string): Promise<IUser> {
    const user = await api.post("/auth/login", {email, password}) as IUser
    return user
}

export async function singInAuthentication(
    prevState: string | undefined,
    formData: FormData,
  ) {
  try {
    await signIn('credentials', formData).then(() => {
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}