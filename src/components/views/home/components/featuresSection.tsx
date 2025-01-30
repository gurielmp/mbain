"use client"
import Image from "next/image"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { FaCheese } from "react-icons/fa" // Importing FontAwesome Cheese Icon
import Link from "next/link"

const features = [
  {
    title: "Risoles",
    description:
      "Our risoles are packed with a variety of rich, creamy cheeses. Every bite offers a unique and delightful cheese experience.",
    image:
      "https://res.cloudinary.com/dm03cwhat/image/upload/v1723931574/omahgembul/20190824_173130_emsftr.jpg",
  },
  {
    title: "Croquette",
    description:
      "Our croquettes are perfectly crisp on the outside, with a creamy, flavorful cheese filling inside. A cheesy indulgence that’s both comforting and delicious.",
    image:
      "https://res.cloudinary.com/dm03cwhat/image/upload/v1723975690/omahgembul/kroket_bni6nu.jpg",
  },
  {
    title: "Bitterballen",
    description:
      "Our handmade bitterballen are filled with tender beef and rich cream cheese, wrapped in a crispy outer layer. A savory snack that melts in your mouth with every bite.",
    image:
      "https://res.cloudinary.com/dm03cwhat/image/upload/v1726564793/omahgembul/20210416_182130_yzfltu.jpg",
  },
]

const FeaturesSection: React.FC = () => {
  useEffect(() => {
    // Optional: You can add any effect when the section mounts
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="py-20 text-gray-800"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dm03cwhat/image/upload/v1737707009/mbain/assets/markus-spiske-0wSyphxLI9g-unsplash_1_nix0eg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1, scale: [0.9, 1] }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex justify-center items-center text-white mb-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#7a6e3a] to-[#b9ac78] rounded-lg opacity-30 transform scale-105 z-0"></div>
          <FaCheese className="text-4xl text-[#E5D5B0] hidden lg:block mr-4 relative z-10" />{" "}
          <h2
            className="text-4xl text-[#E5D5B0] font-bold relative z-10 text-shadow-lg 
              [text-shadow:2px_2px_4px_rgba(0,0,0,0.7)]"
          >
            Why Choose Our Cheesy Risoles, Croquettes, and Bitterballen?
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative bg-black bg-opacity-30 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 backdrop-blur-md"
            >
              <div className="relative mb-6">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={500} // Setting width and height
                  height={400}
                  priority={true} // Adding priority prop
                  className="rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 rounded-xl group-hover:scale-105 duration-300"></div>
              </div>
              <div className="relative">
                <h3 className="text-2xl font-semibold text-[#ffffff] mb-2">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-100">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12"
        >
          <Link href="/menu">
            <div className="inline-block bg-gradient-to-r from-[#a42626] to-[#a42626] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
              Explore Our Menu
            </div>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default FeaturesSection
