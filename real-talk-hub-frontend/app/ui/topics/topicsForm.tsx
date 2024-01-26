"use client"
import { createTopic } from "@/app/lib/actions"
import { useFormState, useFormStatus } from "react-dom"
import { Button } from "../button"

export default function TopicsForm() {
    const [errorMessage, dispatch] = useFormState(createTopic, undefined)

    return (
        <form action={dispatch} className="flex w-full justify-center gap-2" >
                <input type="text" id="title" required name="title" className="flex w-full bg-gray-900 rounded-md text-white text-lg p-1"/>
                <CreateTopicButton/>
        </form>
    )
}

function CreateTopicButton() {
    const { pending } = useFormStatus();
   
    return (
      <Button aria-disabled={pending} className="flex justify-center text-black font-mono font-medium bg-green-500 hover:bg-green-300 transition-colors rounded-md p-2 w-1/3 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
        CREATE
      </Button>
    );  
  }