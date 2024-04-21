import api from "./api";
import { ITopicBase, ITopicCreate } from "../interfaces/ITopic";
import { unstable_noStore } from "next/cache";
import { IMessageBase } from "../interfaces/IMessage";

interface ServerFunctions {
  createTopic: (data: ITopicCreate) => Promise<ITopicBase>
  getTopics: () => Promise<ITopicBase[]>
  getTopic: (id: string) => Promise<ITopicBase>
  deleteTopic: (id: string) => Promise<ITopicBase>
  getMessagesFromTopic: (id: string) => Promise<IMessageBase[]>
}

const topicServices: ServerFunctions = {
  async createTopic(data) {
    unstable_noStore()

    const response = await api.post("/topic", {title: data.title, userId: data.user.id})
    const topic: ITopicBase = response.data
      return topic
  },

  async getTopics() {
    unstable_noStore()
    const response = await api.get("/topic")
    const topics: ITopicBase[] = response.data
    topics.reverse()
    return topics
  },

  async getTopic(id) {
    unstable_noStore()
    const response = await api.get(`topic/${id}`)
    const topic = response.data
    return topic
  },

  async getMessagesFromTopic(id: string) {
    unstable_noStore()
    const response = await api.get(`/message/topic/${id}/messages`)
    const messages = response.data
    return messages
  },

   async deleteTopic(id: string) {
    unstable_noStore()
    const response = await api.delete(`/topic/${id}`)
    const topic: ITopicBase =response.data
    return topic
  }
};

export default topicServices;