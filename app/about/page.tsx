"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

export default function AboutUs() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#fffaf1] pt-24">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Team
        </motion.h1>

        <div ref={containerRef} className="space-y-24">
          <motion.div className="flex flex-col md:flex-row items-center gap-8" style={{ opacity, scale }}>
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
                With over 15 years of experience in professional photography, Richard Marlow brings a wealth of
                knowledge and creativity to every shoot. His expertise spans various styles, including:
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
                Margarita Makeeva is our talented makeup artist with a passion for bringing out the best in every
                client. Her versatile skills cover a wide range of makeup styles, including:
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
    </div>
  )
}

