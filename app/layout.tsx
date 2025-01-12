import "./globals.css"
import { Inter } from 'next/font/google'
import { ConfigProvider } from 'antd'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Seconcode - Master Your IT Skills',
  description: 'Interactive platform for IT professionals and students to improve their technical skills through challenges and real-world scenarios',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#10b981', // emerald-500
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  )
}
