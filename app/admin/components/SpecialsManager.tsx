"use client"

import { useState, type React } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2 } from "lucide-react"

type Special = {
  id: string
  title: string
  description: string
  price: number
  validUntil: string
}

export default function SpecialsManager() {
  const [specials, setSpecials] = useState<Special[]>([])
  const [isAddingSpecial, setIsAddingSpecial] = useState(false)
  const [editingSpecial, setEditingSpecial] = useState<Special | null>(null)

  const handleAddSpecial = (special: Special) => {
    setSpecials([...specials, special])
    setIsAddingSpecial(false)
  }

  const handleEditSpecial = (special: Special) => {
    setSpecials(specials.map((s) => (s.id === special.id ? special : s)))
    setEditingSpecial(null)
  }

  const handleDeleteSpecial = (id: string) => {
    setSpecials(specials.filter((special) => special.id !== id))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Specials Management</h2>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#ffccb0] text-[#1a1a1a] px-4 py-2 rounded-full flex items-center space-x-2"
        onClick={() => setIsAddingSpecial(true)}
      >
        <Plus size={20} />
        <span>Add New Special</span>
      </motion.button>

      {isAddingSpecial && <SpecialForm onSubmit={handleAddSpecial} onCancel={() => setIsAddingSpecial(false)} />}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {specials.map((special) => (
          <motion.div
            key={special.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#2a2a2a] p-4 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-2">{special.title}</h3>
            <p className="text-gray-300 mb-2">{special.description}</p>
            <p className="text-[#ffccb0] font-bold mb-2">${special.price}</p>
            <p className="text-sm text-gray-400 mb-4">Valid until: {special.validUntil}</p>
            <div className="flex justify-between">
              <button
                onClick={() => setEditingSpecial(special)}
                className="text-[#ffccb0] hover:text-[#fffaf1] transition-colors"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => handleDeleteSpecial(special.id)}
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {editingSpecial && (
        <SpecialForm special={editingSpecial} onSubmit={handleEditSpecial} onCancel={() => setEditingSpecial(null)} />
      )}
    </div>
  )
}

type SpecialFormProps = {
  special?: Special
  onSubmit: (special: Special) => void
  onCancel: () => void
}

function SpecialForm({ special, onSubmit, onCancel }: SpecialFormProps) {
  const [formData, setFormData] = useState<Special>(
    special || {
      id: "",
      title: "",
      description: "",
      price: 0,
      validUntil: "",
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: name === "price" ? Number.parseFloat(value) : value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ...formData, id: special ? special.id : Date.now().toString() })
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
        <label htmlFor="price" className="block mb-1">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 bg-[#1a1a1a] rounded"
          required
          min="0"
          step="0.01"
        />
      </div>
      <div>
        <label htmlFor="validUntil" className="block mb-1">
          Valid Until
        </label>
        <input
          type="date"
          id="validUntil"
          name="validUntil"
          value={formData.validUntil}
          onChange={handleChange}
          className="w-full p-2 bg-[#1a1a1a] rounded"
          required
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
          {special ? "Update" : "Add"} Special
        </button>
      </div>
    </form>
  )
}

