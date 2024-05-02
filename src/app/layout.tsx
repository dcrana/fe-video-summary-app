import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getGlobalData, getGlobalPageMetadata } from '@/data/loader'
import Header from '@/components/custom/Header'
import Footer from '@/components/custom/Footer'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const generateMetadata = async (): Promise<Metadata> => {
  const metadata = await getGlobalPageMetadata()
  return {
    title: metadata?.title,
    description: metadata.description,
  }
}

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const globalData = await getGlobalData()

  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="bottom-center" />
        <Header data={globalData.header} />
        {children}
        <Footer data={globalData.footer} />
      </body>
    </html>
  )
}

export default RootLayout
