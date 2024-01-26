"use client"

import { deleteTopic } from "@/app/lib/actions"
import { Button } from "../button"

interface ButtonDeleteTopicProps {
    id: string;
  }

export default function ButtonDeleteTopic({id}: ButtonDeleteTopicProps ){
    return(
        <Button onClick={
            async () => {
                await deleteTopic(id)
            }
        } className="font-mono font-bold text-red-600 flex border-2 min-w-20 justify-center border-red-600 p-2 items-center bg-transparent rounded-md 
                hover:bg-red-600 hover:text-white transition-colors active:bg-red-800 active:text-white">Delete</Button>
    )
}