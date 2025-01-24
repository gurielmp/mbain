import type { Metadata } from "next"
import { Quicksand } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/fragments/navbar/navbar"
import Footer from "@/components/fragments/footer/footer"

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Sharain | bite & bliss",
  description:
    "Discover Sharain's world of delightful snacks! Indulge in our premium risoles, croquettes, and bitterballen crafted for your ultimate satisfaction.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={quicksand.className}>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
