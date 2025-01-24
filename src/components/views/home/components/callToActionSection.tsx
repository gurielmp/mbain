"use client"
import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"

const CallToActionSection: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="py-16 bg-[#e1d89f]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl font-bold text-[#7a6e3a] mb-8"
        >
          Get Your Risoles Today!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-[#7a6e3a] mb-8"
        >
          Don’t miss out on the taste sensation of our homemade risoles. Order
          now and experience the delight for yourself.
        </motion.p>
        <motion.a
          href="/menu"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="inline-block bg-[#7a6e3a] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-[#5d542a]"
        >
          Order Now
        </motion.a>
      </div>
    </motion.section>
  )
}

export default CallToActionSection
