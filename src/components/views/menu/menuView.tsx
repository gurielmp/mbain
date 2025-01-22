"use client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase/config"
import Image from "next/image"
import { PiCheeseBold } from "react-icons/pi"

interface Product {
  id: string
  productName: string
  price: number
  description: string
  imageUrl: string
}

const MenuView: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"))
      const productList = querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Product)
      )
      setProducts(productList)
    }

    fetchProducts()
  }, [])

  return (
    <div className="bg-gradient-to-b from-[#f7d8b7] to-[#f3a683] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-[#2f1c1c] mb-12 drop-shadow-lg"
        >
          Discover Our Delicious Selections
        </motion.h2>

        <motion.h3
          className="text-3xl font-bold text-[#2f1c1c] mb-6 flex items-center justify-center text-center bg-[#fef9f3] p-4 rounded-lg shadow-lg hover:bg-[#f9f0e1] hover:bg-opacity-60 transition-colors duration-300 bg-opacity-60"
          initial={{ opacity: 0, y: 50 }} // Slide up effect on load
          animate={{ opacity: 1, y: 0 }} // Animate to normal position
          transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition on load
          whileHover={{ scale: 0.95 }} // Scale on hover
          whileTap={{ scale: 0.95 }} // Optional: Add a tap effect
        >
          <PiCheeseBold className="mr-4 text-[#d35400] text-4xl" />
          Risoles
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="relative bg-white bg-opacity-60 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-3 group"
            >
              <div className="relative w-full h-56 mb-4 overflow-hidden rounded-lg">
                <Image
                  src={product.imageUrl}
                  alt={product.productName}
                  layout="fill"
                  objectFit="cover"
                  className="transform group-hover:scale-110 transition-transform duration-300 rounded-lg"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-2xl font-semibold text-[#2f1c1c] mb-2">
                {product.productName}
              </h3>
              <p className="text-[#403d39] mb-4 leading-relaxed">
                {product.description}
              </p>
              <p className="text-xl font-bold text-[#d35400] mb-2">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(product.price)}
              </p>
              {/* <p className="text-sm text-[#403d39] italic">
                {product.additionalInfo}
              </p> */}
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16"
        >
          <h3 className="text-4xl font-extrabold text-[#2f1c1c] mb-6">
            Ready to Order?
          </h3>
          <p className="text-lg text-[#403d39] mb-8">
            Place your order now and indulge in our mouthwatering risoles,
            croquettes, and bitterballen!
          </p>
          <motion.a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-[#d35400] to-[#e67e22] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Order via WhatsApp
          </motion.a>
        </motion.div>
      </div>
    </div>
  )
}

export default MenuView
