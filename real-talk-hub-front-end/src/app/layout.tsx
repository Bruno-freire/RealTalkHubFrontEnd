import type { Metadata } from 'next'

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
      <body>{children}</body>
    </html>
  )
}
