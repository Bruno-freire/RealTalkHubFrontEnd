"use server"

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { IUserBase, IUserWithTopics } from "../interfaces/IUser";
import { redirect } from "next/navigation";
import api from "./api";
import topicServices from "./topicServices";
import userServices from "./userServices";
import { revalidatePath, unstable_noStore } from "next/cache";

export async function singInAuthentication(
    prevState: string | undefined,
    formData: FormData,
  ) {
  try {
    revalidatePath("/login")
    
    unstable_noStore()
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
      unstable_noStore()
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

export async function createTopic(
  prevState: string | undefined,
  formData: FormData,
) {
try {
  unstable_noStore()
  const user = await userServices.showUser()
  const title = formData.get("title")?.toString()
  if(!title) throw new Error("title is required!")
  revalidatePath("/home")
  await topicServices.createTopic({
    title: title,
    user: user
  })
} catch (error: any) {
 return `${error.message}`
}
}

export async function fetchTopics(){
  unstable_noStore()
  const topics = await topicServices.getTopics()
  return topics
}

export async function deleteTopic(id: string){
  unstable_noStore()
  const topic = await topicServices.deleteTopic(id)
  revalidatePath("/home")
  return topic
}

export async function verifyTopicsAreAssociatedWithUser(email: string): Promise<IUserWithTopics | null> {
  try {
    unstable_noStore()
    const userWithTopics = await userServices.showUserWithTopics(email);
    return userWithTopics;
  } catch (error: any) {
    return null;
  }
}