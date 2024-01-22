import type { Metadata } from 'next'
import "./globals.css"

export const metadata: Metadata = {
  title: 'RealTalkHub',
  description: 'app to chat in groups in real time',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex w-full flex-col h-screen items-center pt-19 ">
          <h1 className="text-white text-3xl my-3">WebSocket real-time forum</h1>
            {children}
        </main>
        </body>
    </html>
  )
}
