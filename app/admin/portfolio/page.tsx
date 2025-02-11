"use client"

import { useState, useEffect } from "react"
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { db, storage } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

type PortfolioItem = {
  id: string
  title: string
  description: string
  imageUrl: string
  category: string
}

export default function PortfolioManagement() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchPortfolioItems()
  }, [])

  const fetchPortfolioItems = async () => {
    const querySnapshot = await getDocs(collection(db, "portfolio"))
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PortfolioItem[]
    setPortfolioItems(items)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file && !editingId) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive",
      })
      return
    }

    try {
      let imageUrl = ""
      if (file) {
        const storageRef = ref(storage, `portfolio/${file.name}`)
        await uploadBytes(storageRef, file)
        imageUrl = await getDownloadURL(storageRef)
      }

      if (editingId) {
        await updateDoc(doc(db, "portfolio", editingId), {
          title,
          description,
          category,
          ...(imageUrl && { imageUrl }),
        })
        toast({
          title: "Success",
          description: "Portfolio item updated successfully",
        })
      } else {
        await addDoc(collection(db, "portfolio"), {
          title,
          description,
          category,
          imageUrl,
        })
        toast({
          title: "Success",
          description: "Portfolio item added successfully",
        })
      }

      setTitle("")
      setDescription("")
      setCategory("")
      setFile(null)
      setEditingId(null)
      fetchPortfolioItems()
    } catch (error) {
      console.error("Error adding/updating portfolio item:", error)
      toast({
        title: "Error",
        description: "An error occurred while saving the portfolio item",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (item: PortfolioItem) => {
    setTitle(item.title)
    setDescription(item.description)
    setCategory(item.category)
    setEditingId(item.id)
  }

  const handleDelete = async (id: string, imageUrl: string) => {
    try {
      await deleteDoc(doc(db, "portfolio", id))
      await deleteObject(ref(storage, imageUrl))
      toast({
        title: "Success",
        description: "Portfolio item deleted successfully",
      })
      fetchPortfolioItems()
    } catch (error) {
      console.error("Error deleting portfolio item:", error)
      toast({
        title: "Error",
        description: "An error occurred while deleting the portfolio item",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Portfolio Management</h1>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} accept="image/*" />
        <Button type="submit">{editingId ? "Update" : "Add"} Portfolio Item</Button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolioItems.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow">
            <img
              src={item.imageUrl || "/placeholder.svg"}
              alt={item.title}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <p className="text-sm text-gray-500 mb-4">Category: {item.category}</p>
            <div className="flex justify-between">
              <Button onClick={() => handleEdit(item)}>Edit</Button>
              <Button onClick={() => handleDelete(item.id, item.imageUrl)} variant="destructive">
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

