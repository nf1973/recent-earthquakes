import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper" // see below

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Recent Earthquakes",
  description: "Where were the most recent earthquakes",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProviderWrapper>
          <Header />
          {children}
        </ThemeProviderWrapper>
      </body>
    </html>
  )
}
