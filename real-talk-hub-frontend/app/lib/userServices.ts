import { IUserBase, ILoginUser } from "../interfaces/IUser";
import api from "./api";

interface ServerFunctions {
  login: (loginData: ILoginUser) => Promise<IUserBase>;
  showUsers: () => Promise<IUserBase[]>;
  // updateUser: (userData: IUpdateUser) => Promise<IUserBase>;
}

const server: ServerFunctions = {
  async login(loginData: ILoginUser): Promise<IUserBase> {
    return await api.post("/auth/login", loginData)
  },

  async showUsers(): Promise<IUserBase[]> {
    return await api.get("/");
  }
};

export default server;