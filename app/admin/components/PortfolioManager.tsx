"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Upload } from "lucide-react"
import { storage, db } from "@/lib/firebase"
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage"
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"

type PortfolioItem = {
  id: string
  title: string
  category: "makeup" | "photography"
  imageUrl: string
  gear: string
  makeup: string
  photographer: string
  editor: string
}

export default function PortfolioManager() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)
  const [galleryImages, setGalleryImages] = useState<string[]>([])

  useEffect(() => {
    fetchPortfolioItems()
    fetchGalleryImages()
  }, [])

  const fetchPortfolioItems = async () => {
    const querySnapshot = await getDocs(collection(db, "portfolioItems"))
    const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as PortfolioItem)
    setPortfolioItems(items)
  }

  const fetchGalleryImages = async () => {
    const listRef = ref(storage, "gallery")
    const res = await listAll(listRef)
    const urls = await Promise.all(res.items.map((itemRef) => getDownloadURL(itemRef)))
    setGalleryImages(urls)
  }

  const handleAddItem = async (item: PortfolioItem) => {
    await addDoc(collection(db, "portfolioItems"), item)
    setIsAddingItem(false)
    fetchPortfolioItems()
  }

  const handleEditItem = async (item: PortfolioItem) => {
    await updateDoc(doc(db, "portfolioItems", item.id), item)
    setEditingItem(null)
    fetchPortfolioItems()
  }

  const handleDeleteItem = async (id: string, imageUrl: string) => {
    await deleteDoc(doc(db, "portfolioItems", id))
    await deleteObject(ref(storage, imageUrl))
    fetchPortfolioItems()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Portfolio Management</h2>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#ffccb0] text-[#1a1a1a] px-4 py-2 rounded-full flex items-center space-x-2"
        onClick={() => setIsAddingItem(true)}
      >
        <Plus size={20} />
        <span>Add New Item</span>
      </motion.button>

      {isAddingItem && (
        <PortfolioItemForm
          onSubmit={handleAddItem}
          onCancel={() => setIsAddingItem(false)}
          galleryImages={galleryImages}
        />
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {portfolioItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#2a2a2a] p-4 rounded-lg"
          >
            <img
              src={item.imageUrl || "/placeholder.svg"}
              alt={item.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-[#ffccb0] mb-4">{item.category}</p>
            <div className="flex justify-between">
              <button
                onClick={() => setEditingItem(item)}
                className="text-[#ffccb0] hover:text-[#fffaf1] transition-colors"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => handleDeleteItem(item.id, item.imageUrl)}
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {editingItem && (
        <PortfolioItemForm
          item={editingItem}
          onSubmit={handleEditItem}
          onCancel={() => setEditingItem(null)}
          galleryImages={galleryImages}
        />
      )}
    </div>
  )
}

type PortfolioItemFormProps = {
  item?: PortfolioItem
  onSubmit: (item: PortfolioItem) => void
  onCancel: () => void
  galleryImages: string[]
}

function PortfolioItemForm({ item, onSubmit, onCancel, galleryImages }: PortfolioItemFormProps) {
  const [formData, setFormData] = useState<PortfolioItem>(
    item || {
      id: "",
      title: "",
      category: "photography",
      imageUrl: "",
      gear: "",
      makeup: "",
      photographer: "",
      editor: "",
    },
  )
  const [file, setFile] = useState<File | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    let imageUrl = formData.imageUrl

    if (file) {
      const storageRef = ref(storage, `portfolio/${file.name}`)
      await uploadBytes(storageRef, file)
      imageUrl = await getDownloadURL(storageRef)
    }

    onSubmit({ ...formData, imageUrl, id: item ? item.id : Date.now().toString() })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-[#2a2a2a] p-6 rounded-lg">
      <div>
        <label htmlFor="title" className="block mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 bg-[#1a1a1a] rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="category" className="block mb-1">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 bg-[#1a1a1a] rounded"
          required
        >
          <option value="photography">Photography</option>
          <option value="makeup">Makeup</option>
        </select>
      </div>
      <div>
        <label htmlFor="imageUrl" className="block mb-1">
          Image
        </label>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {galleryImages.map((url, index) => (
            <img
              key={index}
              src={url || "/placeholder.svg"}
              alt={`Gallery image ${index + 1}`}
              className={`w-full h-24 object-cover cursor-pointer rounded ${
                formData.imageUrl === url ? "border-4 border-[#ffccb0]" : ""
              }`}
              onClick={() => setFormData({ ...formData, imageUrl: url })}
            />
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="flex-grow p-2 bg-[#1a1a1a] rounded"
            required
          />
          <label className="cursor-pointer bg-[#ffccb0] text-[#1a1a1a] p-2 rounded hover:bg-[#fffaf1] transition-colors">
            <Upload size={20} />
            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
          </label>
        </div>
      </div>
      <div>
        <label htmlFor="gear" className="block mb-1">
          Gear Used
        </label>
        <input
          type="text"
          id="gear"
          name="gear"
          value={formData.gear}
          onChange={handleChange}
          className="w-full p-2 bg-[#1a1a1a] rounded"
        />
      </div>
      <div>
        <label htmlFor="makeup" className="block mb-1">
          Makeup Artist
        </label>
        <input
          type="text"
          id="makeup"
          name="makeup"
          value={formData.makeup}
          onChange={handleChange}
          className="w-full p-2 bg-[#1a1a1a] rounded"
        />
      </div>
      <div>
        <label htmlFor="photographer" className="block mb-1">
          Photographer
        </label>
        <input
          type="text"
          id="photographer"
          name="photographer"
          value={formData.photographer}
          onChange={handleChange}
          className="w-full p-2 bg-[#1a1a1a] rounded"
        />
      </div>
      <div>
        <label htmlFor="editor" className="block mb-1">
          Editor
        </label>
        <input
          type="text"
          id="editor"
          name="editor"
          value={formData.editor}
          onChange={handleChange}
          className="w-full p-2 bg-[#1a1a1a] rounded"
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#ffccb0] text-[#1a1a1a] rounded hover:bg-[#fffaf1] transition-colors"
        >
          {item ? "Update" : "Add"} Item
        </button>
      </div>
    </form>
  )
}

