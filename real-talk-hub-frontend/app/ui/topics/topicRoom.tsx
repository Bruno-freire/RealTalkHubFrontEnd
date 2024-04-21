"use client"
import Link from "next/link"
import FormSend from "./formSend"
import { ITopicBase } from "@/app/interfaces/ITopic"
import { IUserSession } from "@/app/interfaces/IUser"
import topicServices from "@/app/lib/topicServices"
import io, { Socket } from "socket.io-client"
import { useEffect, useState } from "react"
import { IMessageBase } from "@/app/interfaces/IMessage"

export default function TopicRoom({topic, userSession}:{topic: ITopicBase, userSession: any}) {
    const user: IUserSession = userSession
    const [messages, setMessages] = useState<IMessageBase[]>([])

    const [socket, setSocket] = useState<Socket | null>(null)

    useEffect(() => {
        const newSocket = io("http://localhost:3333")
        setSocket(newSocket)
        
        return () => {
            newSocket.close()
        }
    }, [])
    
    useEffect(() => {
        if (!socket) return
        socket.emit("join_room", {
            name: user.name, topicId: topic.id
        })

        socket.on("new_message", (newMessage: IMessageBase) => {
            setMessages((mostRecentMessage) => [...mostRecentMessage, newMessage]) 
        })

        return () => {
            socket.emit("leave_room", {name: user.name, topicId: topic.id})
            socket.off("new_message")
        }
    }, [socket])

    return (
        <main>
            <header>
                <h2>{topic.title}</h2>
                <Link href={"/home"}>Voltar</Link>
            </header>

            <section>{messages.map(message => String(message.content))}</section>

            <FormSend user={user} topicId={topic.id} socket={socket}/>
        </main>
    )
}