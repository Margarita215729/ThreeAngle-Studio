"use client"

import { useState, useEffect } from "react"
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

type Special = {
  id: string
  title: string
  description: string
  price: number
  validUntil: string
}

export default function SpecialsManagement() {
  const [specials, setSpecials] = useState<Special[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [validUntil, setValidUntil] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchSpecials()
  }, [])

  const fetchSpecials = async () => {
    const querySnapshot = await getDocs(collection(db, "specials"))
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Special[]
    setSpecials(items)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        await updateDoc(doc(db, "specials", editingId), {
          title,
          description,
          price: Number(price),
          validUntil,
        })
        toast({
          title: "Success",
          description: "Special offer updated successfully",
        })
      } else {
        await addDoc(collection(db, "specials"), {
          title,
          description,
          price: Number(price),
          validUntil,
        })
        toast({
          title: "Success",
          description: "Special offer added successfully",
        })
      }

      setTitle("")
      setDescription("")
      setPrice("")
      setValidUntil("")
      setEditingId(null)
      fetchSpecials()
    } catch (error) {
      console.error("Error adding/updating special offer:", error)
      toast({
        title: "Error",
        description: "An error occurred while saving the special offer",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (special: Special) => {
    setTitle(special.title)
    setDescription(special.description)
    setPrice(special.price.toString())
    setValidUntil(special.validUntil)
    setEditingId(special.id)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "specials", id))
      toast({
        title: "Success",
        description: "Special offer deleted successfully",
      })
      fetchSpecials()
    } catch (error) {
      console.error("Error deleting special offer:", error)
      toast({
        title: "Error",
        description: "An error occurred while deleting the special offer",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Specials Management</h1>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <Input
          type="date"
          placeholder="Valid Until"
          value={validUntil}
          onChange={(e) => setValidUntil(e.target.value)}
          required
        />
        <Button type="submit">{editingId ? "Update" : "Add"} Special Offer</Button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {specials.map((special) => (
          <div key={special.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{special.title}</h2>
            <p className="text-gray-600 mb-2">{special.description}</p>
            <p className="text-sm text-gray-500 mb-1">Price: ${special.price}</p>
            <p className="text-sm text-gray-500 mb-4">Valid until: {special.validUntil}</p>
            <div className="flex justify-between">
              <Button onClick={() => handleEdit(special)}>Edit</Button>
              <Button onClick={() => handleDelete(special.id)} variant="destructive">
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

