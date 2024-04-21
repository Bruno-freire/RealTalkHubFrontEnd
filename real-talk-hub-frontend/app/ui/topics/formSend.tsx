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
        <form onSubmit={handleSubmitMessage} >
            <input type="text" name="message" id="message" placeholder="Digite sua mensagem..." required/>
            <button>Enviar</button>
        </form>
    )
}