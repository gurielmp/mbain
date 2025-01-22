"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

const DesktopNavbar: React.FC<{ isScrolled: boolean }> = ({ isScrolled }) => {
  const pathname = usePathname()

  const isCurrentPage = (path: string) => {
    return pathname === path
  }

  return (
    <div className="hidden md:flex md:items-center">
      <motion.ul
        className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Menu", path: "/menu" },
          { name: "Contact", path: "/contact" },
        ].map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`${
              isCurrentPage(item.path)
                ? "text-yellow-400"
                : isScrolled
                ? "text-white"
                : "text-gray-200"
            } hover:text-gray-900`}
          >
            <motion.li
              whileHover={{
                scale: 1.15,
                x: 1,
                rotate: 0,
                backgroundColor: isScrolled ? "#FFD700" : "#F4A261",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
              className="px-3 py-1 rounded-lg"
            >
              {item.name}
            </motion.li>
          </Link>
        ))}
      </motion.ul>
    </div>
  )
}

export default DesktopNavbar
