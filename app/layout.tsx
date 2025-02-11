import "./globals.css"
import { Inter } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { AuthProvider } from "@/contexts/AuthContext"
import { Toaster } from "@/components/ui/toaster"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ThreeangleStudio - Photography and Makeup Services",
  description: "Professional photography and makeup services in Pennsylvania",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="relative min-h-screen overflow-hidden">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}

