"use client"
import '../../postcss.config'

import { useState } from "react"
import "./globals.css"
import { IUser } from "./interfaces/IUser"
import { Login } from "./lib/userServices"

export default function Home() {
  const [user, setUser] = useState<IUser | null>(null)

  return (
    <main className="flex w-100% justify-center items-center bg-white text-white">
      <h1 className="text-white">WebSocket real-time forum</h1>
    </main>
  )
}
