"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, doc, deleteDoc, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

type Message = {
  id: string
  name: string
  email: string
  message: string
  createdAt: Date
}

export default function MessageCenter() {
  const [messages, setMessages] = useState<Message[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    const fetchedMessages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    })) as Message[]
    setMessages(fetchedMessages)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "messages", id))
      toast({
        title: "Success",
        description: "Message deleted successfully",
      })
      fetchMessages()
    } catch (error) {
      console.error("Error deleting message:", error)
      toast({
        title: "Error",
        description: "An error occurred while deleting the message",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Message Center</h1>
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{message.name}</h2>
            <p className="text-gray-600 mb-2">{message.email}</p>
            <p className="text-gray-800 mb-4">{message.message}</p>
            <p className="text-sm text-gray-500 mb-4">Received: {message.createdAt.toLocaleString()}</p>
            <Button onClick={() => handleDelete(message.id)} variant="destructive">
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

