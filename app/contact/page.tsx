"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { db } from "@/lib/firebase"
import { collection, addDoc } from "firebase/firestore"

export default function Contact() {
  const [contactMethod, setContactMethod] = useState("email")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()

  const onSubmit = async (data: any) => {
    try {
      // Save to Firestore
      await addDoc(collection(db, "contactSubmissions"), {
        ...data,
        createdAt: new Date(),
      })

      setIsSubmitted(true)
      reset()
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error submitting the form. Please try again.")
    }
  }

  const formFields = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#fffaf1] pt-20">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact Us
        </motion.h1>

        {isSubmitted ? (
          <motion.div
            className="max-w-lg mx-auto bg-[#ffccb0] text-[#1a1a1a] p-6 rounded-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-2">Thank you!</h2>
            <p>We've received your message and will get back to you soon.</p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-lg mx-auto space-y-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          >
            <motion.div variants={formFields} custom={0}>
              <label htmlFor="name" className="block mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: true })}
                className="w-full p-2 bg-[#2a2a2a] border-2 border-transparent rounded focus:outline-none focus:border-[#ffccb0] transition-colors"
              />
              {errors.name && (
                <motion.span className="text-[#ffccb0]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  This field is required
                </motion.span>
              )}
            </motion.div>

            <motion.div variants={formFields} custom={1}>
              <label htmlFor="contactMethod" className="block mb-2">
                Preferred contact method
              </label>
              <select
                id="contactMethod"
                {...register("contactMethod")}
                onChange={(e) => setContactMethod(e.target.value)}
                className="w-full p-2 bg-[#2a2a2a] border-2 border-transparent rounded focus:outline-none focus:border-[#ffccb0] transition-colors"
              >
                <option value="email">Email</option>
                <option value="phone">Phone (text messages only)</option>
              </select>
            </motion.div>

            {contactMethod === "email" ? (
              <motion.div variants={formFields} custom={2}>
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                  className="w-full p-2 bg-[#2a2a2a] border-2 border-transparent rounded focus:outline-none focus:border-[#ffccb0] transition-colors"
                />
                {errors.email && (
                  <motion.span className="text-[#ffccb0]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Please enter a valid email
                  </motion.span>
                )}
              </motion.div>
            ) : (
              <motion.div variants={formFields} custom={2}>
                <label htmlFor="phone" className="block mb-2">
                  Phone number
                </label>
                <div className="flex">
                  <span className="bg-[#2a2a2a] p-2 rounded-l border-2 border-r-0 border-transparent">+1</span>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone", { required: true, pattern: /^[0-9]{10}$/ })}
                    className="w-full p-2 bg-[#2a2a2a] border-2 border-l-0 border-transparent rounded-r focus:outline-none focus:border-[#ffccb0] transition-colors"
                  />
                </div>
                {errors.phone && (
                  <motion.span className="text-[#ffccb0]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Please enter a valid 10-digit phone number
                  </motion.span>
                )}
              </motion.div>
            )}

            <motion.div variants={formFields} custom={3}>
              <label htmlFor="message" className="block mb-2">
                Message
              </label>
              <textarea
                id="message"
                {...register("message", { required: true })}
                className="w-full p-2 bg-[#2a2a2a] border-2 border-transparent rounded focus:outline-none focus:border-[#ffccb0] transition-colors h-32"
              ></textarea>
              {errors.message && (
                <motion.span className="text-[#ffccb0]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  This field is required
                </motion.span>
              )}
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#ffccb0] text-[#1a1a1a] px-6 py-3 rounded-full text-lg font-semibold 
                transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
              variants={formFields}
              custom={4}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </motion.button>
          </motion.form>
        )}
      </div>
    </div>
  )
}

