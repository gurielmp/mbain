// app/not-found.tsx

import Link from "next/link"

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 px-4">
      {/* 404 Heading */}
      <h1 className="text-6xl sm:text-8xl font-extrabold text-[#E5D5B0] mb-4 drop-shadow-lg">
        404
      </h1>

      {/* Error Message */}
      <p className="text-2xl sm:text-3xl text-[#403d39] mb-4 text-center">
        Oops! The page you{"'"}re looking for doesn{"'"}t exist or has been
        moved.
      </p>

      {/* Description */}
      <p className="text-lg sm:text-xl text-[#403d39] mb-8 text-center max-w-lg">
        The page you requested might have been deleted, or the URL might be
        incorrect. Let{"'"}s get you back to safety.
      </p>

      {/* Go Back Button */}
      <Link
        href="/"
        className="px-8 py-4 bg-yellow-500 text-white text-lg font-semibold rounded-md hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Go back to Homepage
      </Link>
    </div>
  )
}

export default NotFound
