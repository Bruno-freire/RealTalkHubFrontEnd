import { ITopicBase } from "./ITopic"
import { IUserBase } from "./IUser"

export interface IMessageBase {
    id: string
    content: string 
    author: IUserBase
    topic: ITopicBase
    created_at: string
}