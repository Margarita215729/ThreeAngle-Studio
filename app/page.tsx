"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"

const MagicBall = () => {
  const [prediction, setPrediction] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)

  const predictions = [
    "A journey of a thousand miles begins with a single step. Your next step will lead to great things.",
    "Your creativity will unlock new opportunities. Trust in your unique vision.",
    "A pleasant surprise is waiting for you around the corner. Stay open to new experiences.",
    "Your hard work will soon pay off. Keep pushing forward with determination.",
    "An unexpected friendship will bring joy into your life. Be open to new connections.",
    "A long-held wish will soon become reality. Keep believing in your dreams.",
    "Your kindness will return to you tenfold. Continue spreading positivity.",
    "A new skill you acquire will open many doors. Embrace lifelong learning.",
    "Financial abundance is on its way. Trust in your ability to attract prosperity.",
    "A period of personal growth is beginning. Embrace the journey of self-discovery.",
    // ... (more predictions)
  ]

  const getRandomPrediction = () => {
    return predictions[Math.floor(Math.random() * predictions.length)]
  }

  const handleClick = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setPrediction(getRandomPrediction())
      setTimeout(() => setIsAnimating(false), 30000) // 30 seconds
    }
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="relative w-80 h-80 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isAnimating ? { rotate: 360 } : {}}
        transition={{ duration: 1 }}
        onClick={handleClick}
      >
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 opacity-50 blur-xl" />

        {/* Glass sphere */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-200/30 to-blue-200/30 backdrop-blur-3xl shadow-2xl" />

        {/* Inner swirl */}
        <div className="absolute inset-4 rounded-full overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-purple-500/50 to-blue-500/50 animate-spin-slow" />
        </div>

        {/* Sparkles */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Prediction text */}
        <AnimatePresence>
          {prediction && (
            <motion.div
              className="absolute inset-8 flex items-center justify-center text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.p
                className="text-white text-sm font-medium"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 30 }}
              >
                {prediction}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <p className="mt-6 text-lg text-center text-gray-300">Click the magic ball to reveal your fortune</p>
    </div>
  )
}

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <div className="bg-[#1a1a1a] text-white">
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-8">Welcome to ThreeangleStudio</h1>
          <p className="text-xl mb-8">Discover Your Daily Magic</p>
          <MagicBall />
        </div>
      </div>

      <div ref={containerRef} className="container mx-auto px-4 py-24 space-y-24">
        <motion.div
          className="flex flex-col md:flex-row items-center gap-8"
          style={{
            opacity,
            scale,
          }}
        >
          <div className="md:w-1/2">
            <Image
              src="/richard-marlow.jpg"
              alt="Richard Marlow"
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Richard Marlow</h2>
            <p className="text-lg mb-4">
              With over 15 years of experience in professional photography, Richard Marlow brings a wealth of knowledge
              and creativity to every shoot. His expertise spans various styles, including:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Portrait photography</li>
              <li>Fashion and editorial</li>
              <li>Wedding and event coverage</li>
              <li>Landscape and nature</li>
              <li>Studio and on-location shoots</li>
            </ul>
            <p className="text-lg mb-4">Richard offers flexible options for clients, including:</p>
            <ul className="list-disc list-inside">
              <li>On-location photoshoots at your preferred venue</li>
              <li>Studio sessions with professional lighting and backdrops</li>
              <li>Destination photography for special events</li>
              <li>Post-processing and retouching services</li>
            </ul>
          </div>
        </motion.div>

        <motion.div className="flex flex-col md:flex-row-reverse items-center gap-8" style={{ opacity, scale }}>
          <div className="md:w-1/2">
            <Image
              src="/margarita-makeeva.jpg"
              alt="Margarita Makeeva"
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Margarita Makeeva</h2>
            <p className="text-lg mb-4">
              Margarita Makeeva is our talented makeup artist with a passion for bringing out the best in every client.
              Her versatile skills cover a wide range of makeup styles, including:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Soft glam for everyday elegance</li>
              <li>Smokey eyes for a dramatic look</li>
              <li>Bridal makeup with pre-wedding trials</li>
              <li>Natural and nude looks</li>
              <li>Avant-garde and editorial makeup</li>
              <li>Special effects and costume makeup</li>
            </ul>
            <p className="text-lg">
              Margarita works closely with each client to understand their vision and create a personalized look that
              enhances their natural beauty and complements the photoshoot theme.
            </p>
          </div>
        </motion.div>

        <motion.div className="text-center" style={{ opacity, scale }}>
          <h2 className="text-3xl font-bold mb-8">Our Collaborative Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image src="/collaboration-1.jpg" alt="Collaboration 1" layout="fill" objectFit="cover" />
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image src="/collaboration-2.jpg" alt="Collaboration 2" layout="fill" objectFit="cover" />
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <video
                src="/collaboration-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="text-lg mt-8">
            Together, Richard and Margarita create stunning visual stories that capture the essence of each client's
            unique personality and style. Their collaborative approach ensures a seamless experience from makeup
            application to the final edited photographs.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

