import { AxiosError } from "axios";
import { IUserBase, ILoginUser } from "../interfaces/IUser";
import api from "./api";
import { promise } from "zod";

interface ServerFunctions {
  login: (loginData: ILoginUser) => Promise<IUserBase>;
  showUsers: () => Promise<IUserBase[]>;
  // updateUser: (userData: IUpdateUser) => Promise<IUserBase>;
}

const server: ServerFunctions = {
  async login(loginData: ILoginUser): Promise<IUserBase> {
    try {
      return await api.post("/auth/login", loginData)
    } catch (error) {
       if(error instanceof AxiosError){
        return Promise.reject(error.response?.data.message)
       }
      return Promise.reject(error)
    }
  },

  async showUsers(): Promise<IUserBase[]> {
    return await api.get("/");
  }
};

export default server;