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
  description: string
  imageUrl: string
  category: "Risoles" | "Croquette" | "Bitterballen" | "Other Delights" // Add category field
}

const ProductBackofficePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    productName: "",
    description: "",
    imageUrl: "",
    category: "Risoles", // Set default category
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
    try {
      const docRef = await addDoc(collection(db, "products"), newProduct)
      const addedProduct = { id: docRef.id, ...newProduct }
      setProducts((prev) => [...prev, addedProduct])
      setNewProduct({
        productName: "",
        description: "",
        imageUrl: "",
        category: "Risoles",
      })
      alert("Product added successfully")
    } catch (error) {
      console.error("Failed to add product", error)
      alert("Failed to add product")
    }
  }

  const handleEditProduct = async (newImageFile?: File) => {
    if (!editingProduct) return

    const {
      id,
      imageUrl: existingImageUrl,
      category,
      ...productData
    } = editingProduct

    let updatedImageUrl = existingImageUrl

    if (newImageFile) {
      if (existingImageUrl) {
        const parts = existingImageUrl.split("/")
        const publicIdWithExtension = parts.slice(-2).join("/")
        const publicId = publicIdWithExtension.split(".")[0]

        if (publicId) {
          const timestamp = Math.floor(Date.now() / 1000)
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

    const productRef = doc(db, "products", id!)
    await updateDoc(productRef, {
      ...productData,
      imageUrl: updatedImageUrl,
      category,
    })

    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, ...productData, imageUrl: updatedImageUrl }
          : product
      )
    )
    setEditingProduct(null)
    alert("Product updated successfully")
  }

  const handleDeleteProduct = async (product: Product) => {
    if (!product.id) return

    if (product.imageUrl) {
      const parts = product.imageUrl.split("/")
      const publicIdWithExtension = parts.slice(-2).join("/")
      const publicId = publicIdWithExtension.split(".")[0]

      if (publicId) {
        const timestamp = Math.floor(Date.now() / 1000)
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
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="p-2 border rounded"
          />
          <select
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                category: e.target.value as
                  | "Risoles"
                  | "Croquette"
                  | "Bitterballen"
                  | "Other Delights",
              })
            }
            className="p-2 border rounded"
          >
            <option value="Risoles">Risoles</option>
            <option value="Croquette">Croquette</option>
            <option value="Bitterballen">Bitterballen</option>
            <option value="Other Delights">Other Delights</option>
          </select>
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
        <ul className="space-y-4">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex flex-col md:flex-row items-start md:items-center md:space-x-4 border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                src={product.imageUrl}
                alt={product.productName}
                width={100}
                height={100}
                className="rounded mb-4 md:mb-0"
              />
              <div>
                <h3 className="text-lg font-bold">{product.productName}</h3>
                <p>{product.description}</p>
                <p className="text-sm text-gray-500">
                  Category: {product.category}
                </p>
              </div>
              <div className="flex space-x-2 mt-4 md:mt-0">
                <button
                  onClick={() => handleDeleteProduct(product)}
                  className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => setEditingProduct(product)}
                  className="p-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {editingProduct && (
        <div className="mt-8">
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
            <select
              value={editingProduct.category}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  category: e.target.value as
                    | "Risoles"
                    | "Croquette"
                    | "Bitterballen"
                    | "Other Delights",
                })
              }
              className="p-2 border rounded"
            >
              <option value="Risoles">Risoles</option>
              <option value="Croquette">Croquette</option>
              <option value="Bitterballen">Bitterballen</option>
              <option value="Other Delights">Other Delights</option>
            </select>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) handleImageUpload(e.target.files[0])
              }}
              className="p-2 border rounded"
            />
            <button
              onClick={() => handleEditProduct()}
              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
