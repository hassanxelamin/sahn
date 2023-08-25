import '@/src/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SAHN',
  icons: {
    icon: '@src/app/balloon.png',
  },
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
