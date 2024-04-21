"use client"
import Link from "next/link"
import FormSend from "./formSend"
import { ITopicBase } from "@/app/interfaces/ITopic"
import { IUserSession } from "@/app/interfaces/IUser"
import topicServices from "@/app/lib/topicServices"
import io, { Socket } from "socket.io-client"
import { useEffect, useRef, useState } from "react"
import { IMessageBase } from "@/app/interfaces/IMessage"
import getTimeFrom from "@/app/utils/get-time-from"

export default function TopicRoom({topic, userSession, uploadedMessages}:{topic: ITopicBase, userSession: any, uploadedMessages: IMessageBase[]}) {
    const user: IUserSession = userSession
    const [messages, setMessages] = useState<IMessageBase[]>(uploadedMessages)
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    const [socket, setSocket] = useState<Socket | null>(null)

    useEffect(() => {
        const newSocket = io("http://localhost:3333")
        setSocket(newSocket)
        
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
            socket.close()
        }
    }, [socket])

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "instant" });
        }
    }, [messages]);

    return (
        <main className="flex flex-col">
            <header className="flex mt-4 justify-between items-center">
                <h2 className="text-white font-mono text-xl">{topic.title}</h2>
                <button className="font-mono rounded-md text-red-600 border-red-600 border-2 py-1.5 px-3 hover:text-white transition-colors hover:bg-red-600">
                    <Link href={"/home"}>VOLTAR</Link>
                </button>
            </header>

            <section className="flex flex-col max-h-72 overflow-y-auto h-72">
                {messages.map((message, index) => {
                    return <p key={index} className="font-mono text-white">
                        {message?.author?.name ? 
                        `[${getTimeFrom(message.created_at)}] ${message.author.name}: ${String(message.content)}` :
                        `${String(message.content)}`
                        }
                        </p>
                })}
                <div ref={messagesEndRef}></div>
            </section>

            <FormSend user={user} topicId={topic.id} socket={socket}/>
        </main>
    )
}