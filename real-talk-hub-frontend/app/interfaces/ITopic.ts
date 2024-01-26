import { IUserBase } from "./IUser";

export interface ITopicBase {
    id: string;
    user: IUserBase;
    title: string;
    messages: string;
}

export interface ITopicCreate {
    user: IUserBase
    title: string
}