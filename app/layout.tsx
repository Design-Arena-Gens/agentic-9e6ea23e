import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Web Development | Futuristic Presentation',
  description: 'An immersive presentation on web development',
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
