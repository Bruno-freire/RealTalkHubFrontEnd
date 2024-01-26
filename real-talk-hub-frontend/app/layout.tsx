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
          <div className='flex lg:w-1/3 md:w-1/2 flex-col'>
            <h1 className="text-white text-3xl w-full my-3 flex justify-center items-center">WebSocket real-time forum</h1>
            {children}
          </div>
        </main>
        </body>
    </html>
  )
}
