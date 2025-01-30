"use client"
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa"
import { motion } from "framer-motion"

const ContactView = () => {
  return (
    <div className="bg-[#e1d89f] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-[#7a6e3a] text-center mb-10"
        >
          Contact Us
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="space-y-4">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-[#7a6e3a] mt-1 mr-2" />
                <div>
                  <h4 className="text-lg font-medium text-[#7a6e3a]">
                    Address
                  </h4>
                  <p className="text-[#595230]">
                    Bumi Asri Residence Kav. 3A, Jl.Lontar, Tanah Baru,
                    Kecamatan Beji, Kota Depok, Jawa Barat 16426, Indonesia
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <FaWhatsapp className="text-[#7a6e3a] mt-1 mr-2" />
                <div>
                  <h4 className="text-lg font-medium text-[#7a6e3a]">
                    Phone / Message
                  </h4>
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#595230] hover:text-[#7a6e3a] transition-colors duration-300"
                  >
                    +62 812-3456-7890
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <FaEnvelope className="text-[#7a6e3a] mt-1 mr-2" />
                <div>
                  <h4 className="text-lg font-medium text-[#7a6e3a]">Email</h4>
                  <p className="text-[#595230]">mbain@sharain.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <div>
                  <h4 className="text-lg font-medium text-[#7a6e3a]">
                    Social Media
                  </h4>
                  <p className="text-[#595230] mb-2">
                    Follow us on our social media channels for the latest
                    updates.
                  </p>
                  <div className="flex space-x-3">
                    <a
                      href="#"
                      className="text-[#7a6e3a] hover:text-[#595230] transition-colors duration-300"
                    >
                      <FaFacebookF />
                    </a>
                    <a
                      target="_blank"
                      href="https://www.instagram.com/sharainedita/"
                      className="text-[#7a6e3a] hover:text-[#595230] transition-colors duration-300"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href="#"
                      className="text-[#7a6e3a] hover:text-[#595230] transition-colors duration-300"
                    >
                      <FaTwitter />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Google Maps Embed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h4 className="text-lg font-medium text-[#7a6e3a] flex items-center mb-4">
              <FaMapMarkerAlt className="mr-2" /> Find Us Here
            </h4>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.276593059073!2d106.7986099!3d-6.3678772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69eeb93d8f0037%3A0xe2418c0daf54425d!2sBumi+Asri+Residence%2C+Jl.+Lontar+No.18%2C+Tanah+Baru%2C+Kecamatan+Beji%2C+Kota+Depok%2C+Jawa+Barat+16426!5e0!3m2!1sid!2sid!4v1615884190384!5m2!1sid!2sid"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-64 rounded-lg"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ContactView
