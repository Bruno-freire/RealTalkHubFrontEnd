import { IUserBase } from "./IUser";

export interface ITopicBase {
    id: string;
    user: IUserBase;
    title: string;
    messages: string;
}

export type ITopicCreate = Pick<ITopicBase, 'title' | 'user'>

export type ITopicRoom = Omit<ITopicBase, 'id'>