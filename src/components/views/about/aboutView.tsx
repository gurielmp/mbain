"use client"
import Image from "next/image"
import { motion } from "framer-motion"

const AboutView = () => {
  return (
    <div className="container mx-auto px-4 pb-12 pt-24">
      {/* Hero Section */}
      <section className="relative h-96 mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="https://res.cloudinary.com/dm03cwhat/image/upload/v1723975642/omahgembul/risol_ig_1_dirw7c.png"
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl font-extrabold text-yellow-300 drop-shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            About Us
          </motion.h1>
          <motion.p
            className="mt-4 text-center text-lg text-yellow-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            Discover the story behind our delicious, cheesy risoles.
          </motion.p>
        </motion.div>
      </section>

      {/* Company Introduction */}
      <section className="text-center mb-12">
        <motion.h2
          className="text-4xl font-extrabold text-yellow-600"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Risoles Omah Gembul
        </motion.h2>
        <motion.p
          className="mt-4 text-lg text-yellow-800"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          Risoles Omah Gembul is an authentic Indonesian risoles provider, known
          for its rich and cheesy flavors in every bite.
        </motion.p>
      </section>

      {/* Brief History */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="md:pr-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-extrabold text-yellow-600 mb-4">
              Our History
            </h2>
            <p className="text-yellow-800 leading-relaxed">
              Operating since 2005, Risoles Omah Gembul has been innovating with
              its extraordinary Cheesy Risoles. We use the finest ingredients,
              including a blend of high-quality cheeses, to create risoles with
              a rich and indulgent flavor.
            </p>
          </motion.div>

          <motion.div
            className="md:pl-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-extrabold text-yellow-600 mb-4">
              Mission and Vision
            </h2>
            <p className="text-yellow-800 leading-relaxed">
              Our mission is to provide high-quality food that brings back sweet
              memories. We are committed to preserving tradition while
              innovating with new and exciting flavors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Team */}
      <section className="mb-12">
        <motion.h2
          className="text-3xl font-extrabold text-yellow-600 mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Our Team
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              src: "https://res.cloudinary.com/dm03cwhat/image/upload/w_400,h_400,c_fill/v1724080058/omahgembul/Screenshot_2024-08-19_at_22.07.05_qnusq7.png",
              name: "Emy",
              position: "Risoles Master",
            },
            {
              src: "https://res.cloudinary.com/dm03cwhat/image/upload/w_400,h_400,c_fill/v1724079185/omahgembul/Screenshot_2024-08-19_at_21.52.43_yjbnft.png",
              name: "Oma Timmy",
              position: "The Gembul Master",
            },
            {
              src: "https://res.cloudinary.com/dm03cwhat/image/upload/w_400,h_400,c_fill/v1724079747/omahgembul/Screenshot_2024-08-19_at_22.02.09_fp0yfm.png",
              name: "Litzea",
              position: "Risoles Skin Lover",
            },
          ].map((teamMember, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Image
                src={teamMember.src}
                alt={teamMember.name}
                width={150}
                height={150}
                className="rounded-full mx-auto object-cover shadow-lg"
              />
              <h3 className="mt-4 text-xl font-bold text-yellow-600">
                {teamMember.name}
              </h3>
              <p className="text-yellow-800">{teamMember.position}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="mb-12">
        <motion.h2
          className="text-3xl font-extrabold text-yellow-600 mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          What Our Customers Say
        </motion.h2>
        <motion.div
          className="flex flex-col space-y-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <p className="text-yellow-800 italic">
            &ldquo;The best risoles I{"'"}ve ever tried!&rdquo;
          </p>
          <p className="text-yellow-800 italic">
            &ldquo;Brings back childhood memories.&rdquo;
          </p>
        </motion.div>
      </section>

      {/* Location and Contact */}
      <section>
        <motion.h2
          className="text-3xl font-extrabold text-yellow-600 mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Location and Contact
        </motion.h2>
        <motion.div
          className="text-yellow-800 leading-relaxed"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <p>
            Visit us at: Bukit Cengkeh Berbunga Blok A3 No.4, 5, Kota Depok,
            Jawa Barat, Indonesia
          </p>
          <p className="mt-2">Phone: +62 812-9494-3929</p>
          <p>Email: risoles.omahgembul@gmail.com</p>
        </motion.div>
      </section>
    </div>
  )
}

export default AboutView
