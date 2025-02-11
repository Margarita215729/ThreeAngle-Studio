"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      await logout()
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of the admin panel",
      })
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="mb-4">Welcome, {user?.email}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Link
          href="/admin/portfolio"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Portfolio Management</h2>
          <p className="text-gray-600">Manage your portfolio items</p>
        </Link>
        <Link
          href="/admin/specials"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Specials Management</h2>
          <p className="text-gray-600">Manage your special offers</p>
        </Link>
        <Link
          href="/admin/messages"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Message Center</h2>
          <p className="text-gray-600">View and manage customer messages</p>
        </Link>
      </div>
      <Button onClick={handleLogout} disabled={loading}>
        {loading ? "Logging out..." : "Logout"}
      </Button>
    </div>
  )
}

