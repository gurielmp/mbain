"use client"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const HeroSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative bg-gradient-to-b from-[#f7d8b7] to-[#efbca4] py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center text-center lg:text-left">
        <div className="lg:w-1/2 lg:pr-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-bold text-[#7a6e3a] mb-6 leading-tight"
          >
            Mbain Risoles
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-[#595230] mb-8 max-w-lg"
          >
            Indulge in a cheesy paradise! Our risoles are packed with a luscious
            mix of creamy, flavorful cheeses, delivering a mouthwatering
            experience in every bite.
          </motion.p>
          <motion.a
            href="/menu"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="inline-block bg-[#7a6e3a] text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-[#595230] transition-colors duration-300"
          >
            Order Now
          </motion.a>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="lg:w-1/2 mt-10 lg:mt-0"
        >
          <div className="relative w-full max-w-xl mx-auto lg:mx-0">
            <Image
              src="https://res.cloudinary.com/dm03cwhat/image/upload/v1723975642/omahgembul/risol_ig_1_dirw7c.png"
              alt="Delicious Cheesy Risoles"
              width={800}
              height={500}
              className="rounded-lg shadow-xl object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#7a6e3a] opacity-30 rounded-lg"></div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default HeroSection
