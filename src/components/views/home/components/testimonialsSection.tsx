"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const TestimonialsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br from-[#e1d89f] to-[#b9ac78] py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl font-extrabold text-[#7a6e3a] mb-12"
        >
          Our Happy Customers
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              text: `These risoles are the best I've ever tasted! Crispy on the outside, creamy on the inside—absolutely delicious.`,
              author: "Sarah W.",
              role: "Food Blogger",
            },
            {
              text: `I love how fresh and tasty these risoles are. Perfect for any occasion!`,
              author: "Michael T.",
              role: "Event Planner",
            },
            {
              text: `Highly recommend! The quality and flavor of these risoles are unmatched.`,
              author: "Emma R.",
              role: "Culinary Enthusiast",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className="group relative bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2"
            >
              <div className="relative flex flex-col items-center">
                <div className="w-16 h-16 bg-[#7a6e3a] rounded-full mb-4 flex items-center justify-center text-white font-bold text-2xl">
                  {testimonial.author[0]}
                </div>
                <p className="text-lg text-gray-700 mb-6 italic leading-relaxed">{`"${testimonial.text}"`}</p>
                <div className="text-center">
                  <p className="text-xl font-semibold text-[#7a6e3a]">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default TestimonialsSection
