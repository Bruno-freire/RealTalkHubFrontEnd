import { AxiosError } from "axios";
import { IUserBase, ILoginUser, IUserWithTopics,  } from "../interfaces/IUser";
import api from "./api";
import { promise } from "zod";
import { auth } from "@/auth";
import { revalidatePath, unstable_noStore } from "next/cache";

interface ServerFunctions {
  login: (loginData: ILoginUser) => Promise<IUserBase | undefined>;
  showUsers: () => Promise<IUserBase[]>;
  showUser: () => Promise<IUserBase>
  showUserWithTopics: (email: string) => Promise<IUserWithTopics>
  // updateUser: (userData: IUpdateUser) => Promise<IUserBase>;
}

const userServices: ServerFunctions = {
  async login(loginData: ILoginUser): Promise<IUserBase> {
    unstable_noStore()
    try {
      const response = await api.post("/auth/login", loginData)
      const user = response.data
      revalidatePath("/home")
      return user
    } catch (error) {
       if(error instanceof AxiosError){
        return Promise.reject(error.response?.data.message)
       }
      return Promise.reject(error)
    }
  },

  async showUsers(): Promise<IUserBase[]> {
    unstable_noStore()
    return await api.get("/all");
  },

  async showUser() {
    unstable_noStore()
    try {
      const session = await auth()
      const email = session?.user?.email
      const response = await api.post("/users/user", { email: email })
      return response.data
    } catch (error: any) {
      console.log(error.message)
      return Promise.reject(error)
    }
  },

  async showUserWithTopics(email) {
    unstable_noStore()
    const response = await api.post("/users/user/topics", {email})
    const user = response.data
    return user
  },
};

export default userServices;