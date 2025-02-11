"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Slider from "react-slick"
import { X } from "lucide-react"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./styles.css"

type Category = "all" | "makeup" | "photography" | "collections"

type PortfolioItem = {
  id: number
  category: "makeup" | "photography" | "collections"
  src: string
  alt: string
  title: string
  description: string
  gear?: string
  makeup?: string
  photographer?: string
  editor?: string
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    category: "photography",
    src: "/portfolio1.jpg",
    alt: "Fashion Photography",
    title: "Urban Chic",
    description: "A vibrant street fashion shoot showcasing the latest urban trends.",
    gear: "Canon EOS R5, 24-70mm f/2.8 lens",
    photographer: "John Smith",
    editor: "Emily Johnson",
  },
  {
    id: 2,
    category: "makeup",
    src: "/portfolio2.jpg",
    alt: "Bridal Makeup",
    title: "Ethereal Bride",
    description: "Soft, romantic bridal makeup for a spring wedding.",
    makeup: "Sarah Brown",
    photographer: "Michael Lee",
  },
  {
    id: 3,
    category: "collections",
    src: "/collection1.jpg",
    alt: "Summer Collection",
    title: "Summer Vibes",
    description: "A curated collection of our best summer photoshoots.",
  },
  // Add more items as needed
]

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>("all")
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)

  const filteredItems = portfolioItems.filter((item) => activeCategory === "all" || item.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#fffaf1] pt-24">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Portfolio
        </motion.h1>

        <motion.div
          className="flex justify-center space-x-4 mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {["all", "makeup", "photography", "collections"].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category as Category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105
                ${
                  activeCategory === category
                    ? "bg-[#ffccb0] text-[#1a1a1a]"
                    : "border border-[#ffccb0] text-[#ffccb0] hover:bg-[#ffccb0] hover:text-[#1a1a1a]"
                }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {activeCategory === "collections" ? (
          <Slider {...sliderSettings} className="collections-slider">
            {filteredItems.map((item) => (
              <div key={item.id} className="px-2">
                <motion.div
                  className="relative h-40 overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={item.src || "/placeholder.svg"}
                    alt={item.alt}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setSelectedItem(item)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={item.alt}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#2a2a2a] p-8 rounded-lg max-w-3xl w-full mx-4 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-[#fffaf1] hover:text-[#ffccb0] transition-colors"
                  onClick={() => setSelectedItem(null)}
                >
                  <X size={24} />
                </button>
                <h2 className="text-3xl font-bold mb-4 text-[#ffccb0]">{selectedItem.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={selectedItem.src || "/placeholder.svg"}
                      alt={selectedItem.alt}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div>
                    <p className="text-lg mb-4">{selectedItem.description}</p>
                    <div className="space-y-2">
                      <p>
                        <strong>Category:</strong> {selectedItem.category}
                      </p>
                      {selectedItem.gear && (
                        <p>
                          <strong>Gear:</strong> {selectedItem.gear}
                        </p>
                      )}
                      {selectedItem.makeup && (
                        <p>
                          <strong>Makeup Artist:</strong> {selectedItem.makeup}
                        </p>
                      )}
                      {selectedItem.photographer && (
                        <p>
                          <strong>Photographer:</strong> {selectedItem.photographer}
                        </p>
                      )}
                      {selectedItem.editor && (
                        <p>
                          <strong>Editor:</strong> {selectedItem.editor}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

