"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import MobileNavbar from "./mobile"
import DesktopNavbar from "./desktop"

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  // Menangani perubahan state berdasarkan scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#2e1f0e] shadow-lg" : "bg-[#160e0c]"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo dan Nama Perusahaan */}
        <Link href="/" className="flex items-center">
          <Image
            src="https://res.cloudinary.com/dm03cwhat/image/upload/v1737455475/omahgembul/DALL_E_2025-01-21_16.39.41_-_A_cartoon-style_illustration_of_a_fashionable_woman_with_short_curly_hair__wearing_oversized_sunglasses_and_a_red_turtleneck__with_a_bold_black_outlin-removebg-preview_hf2mah.png"
            alt="Logo Mba Ain"
            width={45}
            height={45}
            className="mr-3"
          />
          <span
            className={`text-xl font-bold ${
              isScrolled ? "text-white" : "text-gray-200"
            }`}
          >
            Sharain | bite & bliss
          </span>
        </Link>

        {/* Mobile Navbar */}
        <MobileNavbar isScrolled={isScrolled} />

        {/* Desktop Navbar */}
        <DesktopNavbar isScrolled={isScrolled} />
      </div>
    </nav>
  )
}

export default Navbar
