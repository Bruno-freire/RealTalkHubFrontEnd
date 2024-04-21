import topicServices from "@/app/lib/topicServices"
import TopicRoom from "@/app/ui/topics/topicRoom"
import { auth } from "@/auth"
import { revalidatePath, revalidateTag } from "next/cache"

export default async function pageTopicRoom({ params} : { params: { id: string } }) {
    const topic = await topicServices.getTopic(params.id)
    const session = await auth()
    const user = session?.user
    if(!user) return null
    const messages = await topicServices.getMessagesFromTopic(topic.id)
    revalidatePath(`/home/topic/${topic.id}/room`)

    return (
        <>
        <TopicRoom topic={topic} userSession={user} uploadedMessages={messages}/>
        </>
    )
}