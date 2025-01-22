import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa"
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="bg-[#160e0c] text-gray-300 py-12">
      {" "}
      {/* Updated background color */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Company Logo */}
        <div className="flex justify-center mb-8 relative">
          {/* Decorative Background for Logo */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="bg-[#544c2b] w-40 h-40 rounded-full opacity-50"></div>{" "}
            {/* Adjusted decorative color */}
          </div>
          <Image
            src="https://res.cloudinary.com/dm03cwhat/image/upload/v1737455475/omahgembul/DALL_E_2025-01-21_16.39.41_-_A_cartoon-style_illustration_of_a_fashionable_woman_with_short_curly_hair__wearing_oversized_sunglasses_and_a_red_turtleneck__with_a_bold_black_outlin-removebg-preview_hf2mah.png"
            alt="Mbain Logo"
            width={120}
            height={120}
            className="relative z-10 mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Company Info */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-lg font-bold text-white">Mbain</h3>
            <p className="text-gray-100 leading-relaxed">
              {" "}
              {/* Slightly lighter text for readability */}
              Serving the finest risoles made with high-quality ingredients and
              an irresistible taste.
            </p>
            <div className="flex items-start space-x-3">
              <FaMapMarkerAlt className="text-gray-300 mt-1" />{" "}
              {/* Adjusted icon color for better visibility */}
              <p className="text-gray-100">
                Bukit Cengkeh Berbunga Blok A3 No.4, 5, Kota Depok, Jawa Barat
                16418
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <FaWhatsapp className="text-gray-300" />
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition duration-300"
              >
                Whatsapp Order : +62 812-3456-7890
              </a>
            </div>
            <p className="mt-6 text-gray-200 border-t border-gray-600 pt-4">
              {" "}
              {/* Updated border and text color */}© {new Date().getFullYear()}{" "}
              Mbain. All rights reserved.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3>{" "}
              <p className="text-gray-100 mb-6">
                {" "}
                {/* Adjusted text color for readability */} Find us on social
                media and stay updated with the latest news.{" "}
              </p>
              <div className="flex space-x-6 justify-center md:justify-start">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition duration-300 transform hover:scale-110"
                >
                  <FaFacebookF className="h-8 w-8" />
                </a>
                <a
                  href="https://www.instagram.com/sharainedita/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition duration-300 transform hover:scale-110"
                >
                  <FaInstagram className="h-8 w-8" />
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition duration-300 transform hover:scale-110"
                >
                  <FaTwitter className="h-8 w-8" />
                </a>
              </div>
            </div>
            <div className="mt-8 md:mt-0 text-gray-200 border-t border-gray-600 pt-4 md:pt-0">
              {" "}
              {/* Updated border and text color */}
              <p className="text-center md:text-left"></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
