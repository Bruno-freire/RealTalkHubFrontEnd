"use client"
import { IMessageBase } from "@/app/interfaces/IMessage";
import { IUserSession } from "@/app/interfaces/IUser";
import { revalidatePath } from "next/cache";
import { FormEvent, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

export default function FormSend({user, topicId, socket}: {user: IUserSession, topicId: string, socket: Socket | null}) {

   async function handleSubmitMessage(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const formData = new FormData(ev.currentTarget)
    const content = formData.get("message")!.toString()
    ev.currentTarget.reset()
    if(!socket) return null
    socket.emit("send_message", {
        content,
        author: user,
        topicId
    })
    
   }

    return (
        <form className="flex gap-x-2" onSubmit={handleSubmitMessage} >
            <input type="text" name="message" id="message" placeholder="Digite sua mensagem..." className="flex w-full bg-gray-900 rounded-md text-white text-lg p-1" required/>
            <button className="flex justify-center text-black font-mono font-medium bg-green-500 hover:bg-green-300 transition-colors rounded-md p-2 w-1/3 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
                ENVIAR
            </button>
        </form>
    )
}