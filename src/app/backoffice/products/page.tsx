"use client"
import { useEffect, useState } from "react"
import { collection, getDocs, addDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase/config"
import Image from "next/image"

interface Product {
  id?: string // Mark as optional because Firestore will generate it
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

  const handleEditProduct = async () => {
    if (editingProduct) {
      const { id, ...productData } = editingProduct // Extract `id` to ensure Firestore receives a compatible object
      const productRef = doc(db, "products", id!)
      await updateDoc(productRef, productData)
      setEditingProduct(null)
      alert("Product updated successfully")
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
            type="text"
            placeholder="Image URL"
            value={newProduct.imageUrl}
            onChange={(e) =>
              setNewProduct({ ...newProduct, imageUrl: e.target.value })
            }
            className="p-2 border rounded"
          />
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
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Image</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border">{product.productName}</td>
                <td className="py-2 px-4 border">{product.price}</td>
                <td className="py-2 px-4 border">{product.description}</td>
                <td className="py-2 px-4 border">
                  <Image
                    width={100}
                    height={100}
                    src={product.imageUrl}
                    alt={product.productName}
                    className="h-16 w-16 object-cover"
                  />
                </td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="mr-2 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
              type="text"
              placeholder="Image URL"
              value={editingProduct.imageUrl}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  imageUrl: e.target.value,
                })
              }
              className="p-2 border rounded"
            />
            <button
              onClick={handleEditProduct}
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
