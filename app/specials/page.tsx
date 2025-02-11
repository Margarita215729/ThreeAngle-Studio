"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, DollarSign, Clock, Sparkles } from "lucide-react"
import { useInView } from "@/hooks/useInView"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"] })

const specials = [
  {
    id: 1,
    title: "Celestial Portrait Package",
    description: "A magical portrait session with ethereal makeup and 5 edited photos.",
    price: 299,
    validUntil: "2025-08-31",
  },
  {
    id: 2,
    title: "Enchanted Wedding Photography",
    description: "Full day wedding coverage with two photographers and a mystical photo album.",
    price: 1999,
    validUntil: "2025-12-31",
  },
  {
    id: 3,
    title: "Starlit Family Session",
    description: "Outdoor family photo session with 10 edited digital images and a touch of magic.",
    price: 399,
    validUntil: "2025-09-30",
  },
]

const CloudBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#2a1b4e] to-[#3b2b6e] opacity-90" />
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <radialGradient id="cloud" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
            </defs>
            {[...Array(5)].map((_, i) => (
              <motion.circle
                key={i}
                cx={`${Math.random() * 100}%`}
                cy={`${Math.random() * 100}%`}
                r="30"
                fill="url(#cloud)"
                initial={{ scale: 1 }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            ))}
          </svg>
        </div>
      </div>
      {children}
    </div>
  )
}

const Star = () => {
  const randomPosition = () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
  })

  const [position, setPosition] = useState(randomPosition())

  useEffect(() => {
    const interval = setInterval(
      () => {
        setPosition(randomPosition())
      },
      Math.random() * 5000 + 3000,
    )

    return () => clearInterval(interval)
  }, []) // Removed randomPosition from useEffect dependencies

  return (
    <motion.div
      className="absolute w-1 h-1 bg-[#ffd700] rounded-full"
      style={position}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.5, 1, 0.5],
        boxShadow: [
          "0 0 2px #ffd700, 0 0 4px #ffd700",
          "0 0 4px #ffd700, 0 0 8px #ffd700",
          "0 0 2px #ffd700, 0 0 4px #ffd700",
        ],
      }}
      transition={{
        duration: Math.random() * 2 + 1,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  )
}

const SparkleEffect = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <Star key={i} />
      ))}
    </div>
  )
}

export default function Specials() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [ref, isInView] = useInView({ threshold: 0.1 })

  return (
    <div className="min-h-screen bg-[#1a0b2e] text-white pt-20">
      <CloudBackground>
        <SparkleEffect />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            className="text-center mb-16 pt-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.h1
              className={`${playfair.className} text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-[#ffb347]`}
            >
              Magical Offers
            </motion.h1>
            <motion.p className="text-2xl text-[#ffd700]/80">
              Capture your enchanted moments with our celestial deals
            </motion.p>
          </motion.div>

          <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specials.map((special, index) => (
              <motion.div
                key={special.id}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredId(special.id)}
                onHoverEnd={() => setHoveredId(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#2a1b4e]/50 to-[#3b2b6e]/50 rounded-lg transform rotate-6 group-hover:rotate-0 transition-transform duration-300" />
                <div className="relative bg-gradient-to-br from-[#2a1b4e] to-[#3b2b6e] p-8 rounded-lg shadow-xl backdrop-blur-sm border border-white/10">
                  <div className="absolute top-0 left-0 w-full h-full bg-white/5 rounded-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-300" />
                  <div className="relative">
                    <h2 className={`${playfair.className} text-2xl font-bold mb-4 text-[#ffd700]`}>{special.title}</h2>
                    <p className="text-white/80 mb-6">{special.description}</p>
                    <div className="flex items-center mb-4">
                      <DollarSign className="w-6 h-6 mr-2 text-[#ffd700]" />
                      <p className="text-3xl font-bold text-[#ffd700]">{special.price}</p>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-[#ffd700]" />
                      <p className="text-sm text-[#ffd700]/80">
                        Valid until: {new Date(special.validUntil).toLocaleDateString()}
                      </p>
                    </div>
                    <AnimatePresence>
                      {hoveredId === special.id && (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg backdrop-blur-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Link
                            href="/contact"
                            className="relative group inline-flex items-center px-8 py-3 overflow-hidden rounded-full bg-gradient-to-r from-[#ffd700] to-[#ffb347] text-black font-semibold shadow-2xl transition-transform duration-300 hover:scale-105"
                          >
                            <span className="relative z-10">Book Now</span>
                            <Sparkles className="w-5 h-5 ml-2 relative z-10" />
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className={`${playfair.className} text-3xl font-bold mb-6 text-[#ffd700]`}>Limited Time Enchantment</h2>
            <div className="flex items-start justify-center mb-6 space-x-2">
              <Clock className="w-6 h-6 text-[#ffd700] flex-shrink-0 mt-1" />
              <p className="text-xl text-[#ffd700]/80 text-left">
                <span className="font-bold">Book</span> any magical offer within the next 48 hours
                <br />
                and receive a mystical 10% discount!
              </p>
            </div>
            <Link
              href="/contact"
              className="relative inline-flex items-center px-10 py-4 overflow-hidden rounded-full bg-gradient-to-r from-[#ffd700] to-[#ffb347] text-black text-xl font-semibold shadow-2xl transition-transform duration-300 hover:scale-105"
            >
              <span className="relative z-10">Contact Us Now</span>
              <Sparkles className="w-6 h-6 ml-2 relative z-10" />
            </Link>
          </motion.div>
        </div>
      </CloudBackground>
    </div>
  )
}

