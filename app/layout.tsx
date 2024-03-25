// import { Figtree } from 'next/font/google'

import getSongsByUserId from '@/actions/getSongsByUserId'
import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices'
import Sidebar from '@/components/Sidebar'
import ToasterProvider from '@/providers/ToasterProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import SupabaseProvider from '@/providers/SupabaseProvider'
import Player from '@/components/Player'

import './globals.css'

// const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Collaboration Social App',
  description: 'Collaboration Social App',
  icons: {
    icon: [
      '/favicon.ico?v=4',
    ],
    apple: [
      '/apple-touch-icon.png?v=4',
    ],
    shortcut: [
      '/apple-touch-icon.png'
    ]
  },
  manifest: '/site.webmanifest',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const products = await getActiveProductsWithPrices();
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
