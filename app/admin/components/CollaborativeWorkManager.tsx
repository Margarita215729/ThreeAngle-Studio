"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2 } from "lucide-react"
import { storage, db } from "@/lib/firebase"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"

type CollaborativeWork = {
  id: string
  title: string
  description: string
  mediaUrl: string
  mediaType: "image" | "video"
}

export default function CollaborativeWorkManager() {
  const [collaborativeWorks, setCollaborativeWorks] = useState<CollaborativeWork[]>([])
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [editingItem, setEditingItem] = useState<CollaborativeWork | null>(null)

  useEffect(() => {
    fetchCollaborativeWorks()
  }, [])

  const fetchCollaborativeWorks = async () => {
    const querySnapshot = await getDocs(collection(db, "collaborativeWorks"))
    const works = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as CollaborativeWork)
    setCollaborativeWorks(works)
  }

  const handleAddItem = async (item: CollaborativeWork) => {
    await addDoc(collection(db, "collaborativeWorks"), item)
    setIsAddingItem(false)
    fetchCollaborativeWorks()
  }

  const handleEditItem = async (item: CollaborativeWork) => {
    await updateDoc(doc(db, "collaborativeWorks", item.id), item)
    setEditingItem(null)
    fetchCollaborativeWorks()
  }

  const handleDeleteItem = async (id: string, mediaUrl: string) => {
    await deleteDoc(doc(db, "collaborativeWorks", id))
    await deleteObject(ref(storage, mediaUrl))
    fetchCollaborativeWorks()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Collaborative Work Management</h2>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#ffccb0] text-[#1a1a1a] px-4 py-2 rounded-full flex items-center space-x-2"
        onClick={() => setIsAddingItem(true)}
      >
        <Plus size={20} />
        <span>Add New Item</span>
      </motion.button>

      {isAddingItem && <CollaborativeWorkForm onSubmit={handleAddItem} onCancel={() => setIsAddingItem(false)} />}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {collaborativeWorks.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#2a2a2a] p-4 rounded-lg"
          >
            {item.mediaType === "image" ? (
              <img
                src={item.mediaUrl || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            ) : (
              <video src={item.mediaUrl} className="w-full h-48 object-cover rounded mb-4" controls />
            )}
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-[#ffccb0] mb-4">{item.description}</p>
            <div className="flex justify-between">
              <button
                onClick={() => setEditingItem(item)}
                className="text-[#ffccb0] hover:text-[#fffaf1] transition-colors"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => handleDeleteItem(item.id, item.mediaUrl)}
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {editingItem && (
        <CollaborativeWorkForm item={editingItem} onSubmit={handleEditItem} onCancel={() => setEditingItem(null)} />
      )}
    </div>
  )
}

type CollaborativeWorkFormProps = {
  item?: CollaborativeWork
  onSubmit: (item: CollaborativeWork) => void
  onCancel: () => void
}

function CollaborativeWorkForm({ item, onSubmit, onCancel }: CollaborativeWorkFormProps) {
  const [formData, setFormData] = useState<CollaborativeWork>(
    item || {
      id: "",
      title: "",
      description: "",
      mediaUrl: "",
      mediaType: "image",
    },
  )
  const [file, setFile] = useState<File | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    let mediaUrl = formData.mediaUrl

    if (file) {
      const storageRef = ref(storage, `collaborative-work/${file.name}`)
      await uploadBytes(storageRef, file)
      mediaUrl = await getDownloadURL(storageRef)
    }

    onSubmit({ ...formData, mediaUrl, id: item ? item.id : Date.now().toString() })
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
        <label htmlFor="description" className="block mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 bg-[#1a1a1a] rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="mediaType" className="block mb-1">
          Media Type
        </label>
        <select
          id="mediaType"
          name="mediaType"
          value={formData.mediaType}
          onChange={handleChange}
          className="w-full p-2 bg-[#1a1a1a] rounded"
          required
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
      </div>
      <div>
        <label htmlFor="mediaFile" className="block mb-1">
          Upload Media
        </label>
        <input
          type="file"
          id="mediaFile"
          onChange={handleFileChange}
          accept={formData.mediaType === "image" ? "image/*" : "video/*"}
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

