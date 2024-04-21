import { ITopicBase } from "./ITopic";

export interface IUserBase {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface ICreateUser extends IUserBase {
  name: string;
  email: string;
  password: string;
}

export type IUserSession = Pick<IUserBase, "email" | "id" | "name" | "password"> & { image?: string };


export interface IUserWithTopics extends IUserBase {
  topics: ITopicBase[]
}

export interface ILoginUser {
  email: string;
  password: string;
}

