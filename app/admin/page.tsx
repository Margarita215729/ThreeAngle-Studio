"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import PortfolioManager from "./components/PortfolioManager"
import SpecialsManager from "./components/SpecialsManager"
import CollaborativeWorkManager from "./components/CollaborativeWorkManager"
import ContactFormSubmissions from "./components/ContactFormSubmissions"

export default function AdminDashboard() {
  const { user, loading, login, logout } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("portfolio")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await login(email, password)
    } catch (error) {
      setError("Invalid credentials")
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-[#fffaf1] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-[#fffaf1] pt-20">
        <div className="container mx-auto px-4 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-6">
              {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded">{error}</div>}
              <div>
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 bg-[#2a2a2a] rounded border-2 border-transparent focus:border-[#ffccb0] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 bg-[#2a2a2a] rounded border-2 border-transparent focus:border-[#ffccb0] transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#ffccb0] text-[#1a1a1a] py-2 rounded font-semibold hover:bg-[#fffaf1] transition-colors disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Login"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#fffaf1] pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => logout()}
            className="bg-[#ffccb0] text-[#1a1a1a] px-4 py-2 rounded hover:bg-[#fffaf1] transition-colors"
          >
            Logout
          </button>
        </div>
        <div className="mb-8">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab("portfolio")}
              className={`px-4 py-2 rounded ${
                activeTab === "portfolio" ? "bg-[#ffccb0] text-[#1a1a1a]" : "text-[#ffccb0]"
              }`}
            >
              Portfolio
            </button>
            <button
              onClick={() => setActiveTab("specials")}
              className={`px-4 py-2 rounded ${
                activeTab === "specials" ? "bg-[#ffccb0] text-[#1a1a1a]" : "text-[#ffccb0]"
              }`}
            >
              Specials
            </button>
            <button
              onClick={() => setActiveTab("collaborative")}
              className={`px-4 py-2 rounded ${
                activeTab === "collaborative" ? "bg-[#ffccb0] text-[#1a1a1a]" : "text-[#ffccb0]"
              }`}
            >
              Collaborative Work
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`px-4 py-2 rounded ${
                activeTab === "contact" ? "bg-[#ffccb0] text-[#1a1a1a]" : "text-[#ffccb0]"
              }`}
            >
              Contact Submissions
            </button>
          </nav>
        </div>
        {activeTab === "portfolio" && <PortfolioManager />}
        {activeTab === "specials" && <SpecialsManager />}
        {activeTab === "collaborative" && <CollaborativeWorkManager />}
        {activeTab === "contact" && <ContactFormSubmissions />}
      </div>
    </div>
  )
}

