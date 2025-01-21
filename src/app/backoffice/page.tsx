import Link from "next/link"

const BackofficePage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
        Backoffice Page
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/backoffice/products"
          className="block p-6 bg-gray-100 hover:bg-gray-200 rounded-lg shadow"
        >
          <h2 className="text-xl font-bold text-gray-800">
            Product Management
          </h2>
          <p className="mt-2 text-gray-600">Manage products in your site.</p>
        </Link>
        <Link
          href="$1"
          className="block p-6 bg-gray-100 hover:bg-gray-200 rounded-lg shadow"
        >
          <h2 className="text-xl font-bold text-gray-800">User Management</h2>
          <p className="mt-2 text-gray-600">Manage user accounts and roles.</p>
        </Link>
        <Link
          href="/"
          className="block p-6 bg-gray-100 hover:bg-gray-200 rounded-lg shadow"
        >
          <h2 className="text-xl font-bold text-gray-800">Back to Home</h2>
          <p className="mt-2 text-gray-600">Return to the main page.</p>
        </Link>
      </div>
    </div>
  )
}

export default BackofficePage
