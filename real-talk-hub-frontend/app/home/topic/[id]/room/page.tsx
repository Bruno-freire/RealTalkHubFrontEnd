import topicServices from "@/app/lib/topicServices"
import TopicRoom from "@/app/ui/topics/topicRoom"
import { auth } from "@/auth"

export default async function pageTopicRoom({ params} : { params: { id: string } }) {
    const topic = await topicServices.getTopic(params.id)
    const session = await auth()
    const user = session?.user
    if(!user) return null
    
    return (
        <>
        <TopicRoom topic={topic} userSession={user}/>
        </>
    )
}