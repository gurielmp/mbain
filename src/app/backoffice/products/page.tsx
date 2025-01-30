"use client"
import { useEffect, useState } from "react"
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"
import { db } from "@/firebase/config"
import Image from "next/image"
import axios from "axios"
import CryptoJS from "crypto-js"

interface Product {
  id?: string // Optional because Firestore will generate it
  productName: string
  price: number
  description: string
  imageUrl: string
}

const ProductBackofficePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    productName: "",
    price: 0,
    description: "",
    imageUrl: "",
  })
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [uploading, setUploading] = useState(false)

  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!
  const UPLOAD_PRESET = "product_images"

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"))
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[]
      setProducts(productList)
    }

    fetchProducts()
  }, [])

  const handleAddProduct = async () => {
    await addDoc(collection(db, "products"), newProduct)
    setNewProduct({ productName: "", price: 0, description: "", imageUrl: "" })
    alert("Product added successfully")
  }

  const handleEditProduct = async (newImageFile?: File) => {
    if (!editingProduct) return

    const { id, imageUrl: existingImageUrl, ...productData } = editingProduct

    let updatedImageUrl = existingImageUrl

    if (newImageFile) {
      if (existingImageUrl) {
        // Extract public ID with folder from the existing image URL
        const parts = existingImageUrl.split("/")
        const publicIdWithExtension = parts.slice(-2).join("/") // Includes folder and file, e.g., "folder_name/file_name.jpg"
        const publicId = publicIdWithExtension.split(".")[0] // Removes the extension

        if (publicId) {
          const timestamp = Math.floor(Date.now() / 1000) // Current time in seconds
          const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET}`
          const signature = CryptoJS.SHA1(stringToSign).toString()

          try {
            await axios.post(
              `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`,
              {
                public_id: publicId,
                timestamp,
                api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
                signature,
              }
            )
          } catch (error) {
            console.error("Failed to delete the old image", error)
          }
        }
      }

      // Upload the new image
      const formData = new FormData()
      formData.append("file", newImageFile)
      formData.append("upload_preset", UPLOAD_PRESET)

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formData
        )
        updatedImageUrl = response.data.secure_url
      } catch (error) {
        console.error("Failed to upload new image", error)
        alert("Failed to upload new image")
        return
      }
    }

    // Update Firestore with the new data
    const productRef = doc(db, "products", id!)
    await updateDoc(productRef, { ...productData, imageUrl: updatedImageUrl })
    setEditingProduct(null)
    alert("Product updated successfully")
  }

  const handleDeleteProduct = async (product: Product) => {
    if (!product.id) return

    if (product.imageUrl) {
      const parts = product.imageUrl.split("/")
      const publicIdWithExtension = parts.slice(-2).join("/") // Includes folder and file, e.g., "folder_name/file_name.jpg"
      const publicId = publicIdWithExtension.split(".")[0] // Removes the extension

      if (publicId) {
        const timestamp = Math.floor(Date.now() / 1000) // Current time in seconds
        const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET}`
        const signature = CryptoJS.SHA1(stringToSign).toString()

        try {
          await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`,
            {
              public_id: publicId,
              timestamp,
              api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
              signature,
            }
          )
        } catch (error) {
          console.error("Failed to delete the image from Cloudinary", error)
        }
      }
    }

    try {
      const productRef = doc(db, "products", product.id)
      await deleteDoc(productRef)
      setProducts((prev) => prev.filter((p) => p.id !== product.id))
      alert("Product deleted successfully")
    } catch (error) {
      console.error("Failed to delete product from Firestore", error)
    }
  }

  const handleImageUpload = async (file: File) => {
    if (file.size > 3 * 1024 * 1024) {
      alert("File size exceeds 3MB limit")
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", UPLOAD_PRESET)

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      )
      const imageUrl = response.data.secure_url
      setNewProduct((prev) => ({ ...prev, imageUrl }))
      alert("Image uploaded successfully")
    } catch (error) {
      console.error("Image upload failed", error)
      alert("Image upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
        Product Backoffice Page
      </h1>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.productName}
            onChange={(e) =>
              setNewProduct({ ...newProduct, productName: e.target.value })
            }
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                price: parseFloat(e.target.value),
              })
            }
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="p-2 border rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) handleImageUpload(e.target.files[0])
            }}
            className="p-2 border rounded"
          />
          {uploading && <p>Uploading image...</p>}
          <button
            onClick={handleAddProduct}
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 border text-left">Name</th>
                <th className="py-3 px-4 border text-left">Price</th>
                <th className="py-3 px-4 border text-left">Description</th>
                <th className="py-3 px-4 border text-left">Image</th>
                <th className="py-3 px-4 border text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4">{product.productName}</td>
                  <td className="py-2 px-4">{product.price}</td>
                  <td className="py-2 px-4">{product.description}</td>
                  <td className="py-2 px-4">
                    <Image
                      width={100}
                      height={100}
                      src={product.imageUrl}
                      alt={product.productName}
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="mr-2 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product)}
                      className="p-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingProduct && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={editingProduct.productName}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  productName: e.target.value,
                })
              }
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  price: parseFloat(e.target.value),
                })
              }
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Description"
              value={editingProduct.description}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  description: e.target.value,
                })
              }
              className="p-2 border rounded"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) handleEditProduct(e.target.files[0])
                else handleEditProduct()
              }}
              className="p-2 border rounded"
            />
            <button
              onClick={() => handleEditProduct()}
              className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductBackofficePage
