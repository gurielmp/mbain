"use client"
import React, { useState } from "react"
import { FiMenu, FiX, FiHome, FiInfo, FiPhone } from "react-icons/fi"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { PiCheese } from "react-icons/pi"
import { usePathname } from "next/navigation"

const MobileNavbar: React.FC<{ isScrolled: boolean }> = ({ isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const isCurrentRoute = (path: string) => {
    return pathname === path
  }

  return (
    <>
      <div className="md:hidden flex items-center">
        <motion.button
          onClick={toggleMenu}
          className={`${
            isScrolled ? "text-white" : "text-gray-200"
          } focus:outline-none`}
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </motion.button>
      </div>

      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={toggleMenu}
        />
      )}

      <motion.div
        className={`fixed top-0 right-0 w-64 h-full bg-gradient-to-b from-[#1a1412] to-[#160e0c] z-50 p-8 flex flex-col justify-between rounded-l-xl shadow-lg transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden duration-300 ease-in-out`}
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
      >
        {/* Close Button */}
        <motion.div
          className="flex justify-end mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }} // Menambahkan animasi saat hover
        >
          <motion.button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            whileHover={{ rotate: 45, scale: 1.2 }} // Menambahkan animasi pada tombol close
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FiX size={24} />
          </motion.button>
        </motion.div>

        <ul className="flex flex-col space-y-6">
          <li
            className={`border-b border-gray-600 pb-4 flex items-center ${
              isCurrentRoute("/") ? "text-yellow-400" : "text-white"
            }`}
          >
            <FiHome className="mr-2" />
            <Link
              href="/"
              className="text-lg font-medium hover:text-gray-400"
              onClick={toggleMenu}
            >
              Home
            </Link>
          </li>
          <li
            className={`border-b border-gray-600 pb-4 flex items-center ${
              isCurrentRoute("/about") ? "text-yellow-400" : "text-white"
            }`}
          >
            <FiInfo className="mr-2" />
            <Link
              href="/about"
              className="text-lg font-medium hover:text-gray-400"
              onClick={toggleMenu}
            >
              About
            </Link>
          </li>
          <li
            className={`border-b border-gray-600 pb-4 flex items-center ${
              isCurrentRoute("/menu") ? "text-yellow-400" : "text-white"
            }`}
          >
            <PiCheese className="mr-2" />
            <Link
              href="/menu"
              className="text-lg font-medium hover:text-gray-400"
              onClick={toggleMenu}
            >
              Menu
            </Link>
          </li>
          <li
            className={`border-b border-gray-600 pb-4 flex items-center ${
              isCurrentRoute("/contact") ? "text-yellow-400" : "text-white"
            }`}
          >
            <FiPhone className="mr-2" />
            <Link
              href="/contact"
              className="text-lg font-medium hover:text-gray-400"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Branding Logo dan Nama Toko di Tengah Vertikal */}
        <motion.div
          className="flex flex-col items-center justify-center flex-grow relative"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <Link
            href="/"
            onClick={toggleMenu}
            className="flex flex-col items-center"
          >
            <div className="relative p-4 rounded-full border-2 border-yellow-400 shadow-lg">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-yellow-500 rounded-full opacity-20 blur-lg"></div>
              {/* Gradient Circle */}
              <div className="absolute inset-0 rounded-full border-4 border-gradient-to-r from-yellow-500 to-red-500"></div>
              <Image
                src="https://res.cloudinary.com/dm03cwhat/image/upload/v1737455475/omahgembul/DALL_E_2025-01-21_16.39.41_-_A_cartoon-style_illustration_of_a_fashionable_woman_with_short_curly_hair__wearing_oversized_sunglasses_and_a_red_turtleneck__with_a_bold_black_outlin-removebg-preview_hf2mah.png"
                alt="Logo Mba Ain"
                width={96}
                height={96}
                className="rounded-full relative z-10"
              />
            </div>
            <span className="text-white text-lg mt-2">Mba Ain</span>
          </Link>
        </motion.div>
      </motion.div>
    </>
  )
}

export default MobileNavbar
