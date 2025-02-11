"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Clock, Sparkles, Palette, Camera, ImageIcon, Globe2 } from "lucide-react"

const services = [
  {
    id: "makeup",
    title: "Professional Makeup",
    price: 250,
    features: [
      {
        icon: <Clock className="w-6 h-6" />,
        text: "Up to 3 hours of service",
      },
      {
        icon: <Sparkles className="w-6 h-6" />,
        text: "Unlimited touch-ups",
      },
      {
        icon: <Palette className="w-6 h-6" />,
        text: "Tailored look based on your preferences",
      },
    ],
    description:
      "Transform your look with our professional makeup services. Whether it's for a special event, photoshoot, or just because, our skilled artists will create the perfect look for you.",
  },
  {
    id: "makeup-photo",
    title: "Makeup & Photo Session",
    price: 420,
    features: [
      {
        icon: <Clock className="w-6 h-6" />,
        text: "Up to 3-hour session",
      },
      {
        icon: <Palette className="w-6 h-6" />,
        text: "Professional makeup",
      },
      {
        icon: <ImageIcon className="w-6 h-6" />,
        text: "At least 10 fully edited photos",
      },
      {
        icon: <Globe2 className="w-6 h-6" />,
        text: "Online gallery",
      },
    ],
    description:
      "Get the complete package with our makeup and photo session combo. Perfect for professional headshots, modeling portfolios, or special occasions.",
  },
  {
    id: "photo",
    title: "Photo Session",
    price: 250,
    features: [
      {
        icon: <Clock className="w-6 h-6" />,
        text: "Up to 2-hour session",
      },
      {
        icon: <Camera className="w-6 h-6" />,
        text: "Professional photography",
      },
      {
        icon: <ImageIcon className="w-6 h-6" />,
        text: "At least 6 fully edited photos",
      },
      {
        icon: <Globe2 className="w-6 h-6" />,
        text: "Online gallery",
      },
    ],
    description:
      "Capture your special moments with our professional photography services. Whether it's portraits, events, or creative shoots, we'll help you create lasting memories.",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Services() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#fffaf1] pt-20">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Choose from our range of professional services, each designed to help you look and feel your best
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="grid gap-16">
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={item}
              className="group relative bg-[#2a2a2a] rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="p-8 md:p-12">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h2 className="text-3xl font-bold text-[#ffccb0]">{service.title}</h2>
                  <div className="text-2xl font-bold text-[#ffccb0] whitespace-nowrap">${service.price}</div>
                </div>
                <p className="text-lg text-gray-300 mb-8 transition-all duration-300 group-hover:text-[#fffaf1] focus-within:text-[#fffaf1]">
                  {service.description}
                </p>
                <ul className="space-y-4 mb-8">
                  {service.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center space-x-3 transition-all duration-300 group-hover:text-[#ffccb0] focus-within:text-[#ffccb0]"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <span className="text-[#ffccb0]">{feature.icon}</span>
                      <span>{feature.text}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-auto">
                  <Link
                    href="/contact"
                    className="inline-block bg-[#ffccb0] text-[#1a1a1a] px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#fffaf1] transition-colors"
                  >
                    Book Now
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

