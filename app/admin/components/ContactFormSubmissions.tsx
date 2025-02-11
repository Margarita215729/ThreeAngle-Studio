"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { db } from "@/lib/firebase"
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore"
import { Trash2 } from "lucide-react"

type ContactSubmission = {
  id: string
  name: string
  email?: string
  phone?: string
  message: string
  createdAt: Date
}

export default function ContactFormSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    const submissionsQuery = query(collection(db, "contactSubmissions"), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(submissionsQuery)
    const submissionData = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
        }) as ContactSubmission,
    )
    setSubmissions(submissionData)
  }

  const handleDeleteSubmission = async (id: string) => {
    await deleteDoc(doc(db, "contactSubmissions", id))
    fetchSubmissions()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Contact Form Submissions</h2>
      <div className="grid gap-6">
        {submissions.map((submission) => (
          <motion.div
            key={submission.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#2a2a2a] p-4 rounded-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-2">{submission.name}</h3>
                {submission.email && <p className="text-[#ffccb0] mb-2">{submission.email}</p>}
                {submission.phone && <p className="text-[#ffccb0] mb-2">{submission.phone}</p>}
                <p className="text-sm text-gray-400 mb-4">Submitted on: {submission.createdAt.toLocaleString()}</p>
                <p className="text-[#fffaf1]">{submission.message}</p>
              </div>
              <button
                onClick={() => handleDeleteSubmission(submission.id)}
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

