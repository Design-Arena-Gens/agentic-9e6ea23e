'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Scene3D from './components/Scene3D'
import ParticleField from './components/ParticleField'

const slides = [
  {
    id: 1,
    title: 'WEB DEVELOPMENT',
    subtitle: 'THE FUTURE IS NOW',
    description: 'Exploring the cutting-edge of modern web technologies',
    gradient: 'from-cyan-500 via-blue-500 to-purple-600'
  },
  {
    id: 2,
    title: 'MUSIC PLAYER',
    subtitle: 'MY PROJECT SHOWCASE',
    description: 'An immersive audio experience built with modern web technologies',
    gradient: 'from-purple-600 via-pink-500 to-red-500',
    isProject: true
  },
  {
    id: 3,
    title: 'TECH STACK',
    subtitle: 'TOOLS & FRAMEWORKS',
    description: 'React • Next.js • TypeScript • Tailwind CSS • Framer Motion',
    gradient: 'from-green-500 via-teal-500 to-cyan-500'
  },
  {
    id: 4,
    title: 'FEATURES',
    subtitle: 'PROJECT HIGHLIGHTS',
    description: 'Responsive Design • Audio Visualization • Social Integration • Modern UI/UX',
    gradient: 'from-orange-500 via-red-500 to-pink-600'
  },
  {
    id: 5,
    title: 'THE FUTURE',
    subtitle: 'WHAT\'S NEXT',
    description: 'WebAssembly • AI Integration • Web3 • Immersive Experiences',
    gradient: 'from-indigo-600 via-purple-600 to-pink-500'
  }
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setTimeout(() => {
        setCursorPosition({ x: e.clientX, y: e.clientY })
      }, 100)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 50) {
        if (e.deltaY > 0) {
          setCurrentSlide((prev) => (prev + 1) % slides.length)
        } else {
          setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('wheel', handleWheel, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])

  const slide = slides[currentSlide]

  return (
    <div ref={containerRef} className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Custom Cursor */}
      <div
        className="cursor"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      />
      <div
        className="cursor-follower"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene3D currentSlide={currentSlide} />
      </div>

      {/* Particle Field */}
      <ParticleField />

      {/* Gradient Overlay */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-30 z-10`}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Main Content */}
      <div className="relative z-20 h-full flex items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 1.2, rotateX: 15 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="text-center max-w-6xl"
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Subtitle */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6"
            >
              <span className="text-cyan-400 text-xl md:text-2xl font-light tracking-[0.3em] font-['Orbitron']">
                {slide.subtitle}
              </span>
            </motion.div>

            {/* Main Title with Mask Effect */}
            <motion.h1
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
              className="text-6xl md:text-9xl font-black mb-8 relative font-['Orbitron']"
              style={{
                background: `linear-gradient(45deg, #00ffff, #ff00ff, #00ffff)`,
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient 3s ease infinite'
              }}
            >
              {slide.title.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
                  className="inline-block"
                  style={{
                    textShadow: '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(255, 0, 255, 0.3)'
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-xl md:text-3xl text-gray-300 font-light max-w-4xl mx-auto"
            >
              {slide.description}
            </motion.p>

            {/* Project Screenshot Placeholder (Slide 2) */}
            {slide.isProject && (
              <motion.div
                initial={{ scale: 0, rotateY: -180 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
                className="mt-12 relative"
              >
                <div className="relative mx-auto max-w-4xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 blur-3xl opacity-50 animate-pulse" />
                  <div className="relative bg-gradient-to-br from-gray-900 to-black border-4 border-cyan-500 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
                    <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-cyan-900/50 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-8xl mb-4">🎵</div>
                        <p className="text-2xl text-cyan-400 font-['Orbitron']">MUSIC PLAYER</p>
                        <p className="text-lg text-gray-400 mt-2">Social Media Integration • Modern UI</p>
                        <div className="flex gap-4 justify-center mt-6">
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center border-2 border-cyan-400"
                          >
                            <span className="text-2xl">▶️</span>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center border-2 border-purple-400"
                          >
                            <span className="text-2xl">📱</span>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center border-2 border-pink-400"
                          >
                            <span className="text-2xl">🔊</span>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex gap-4 items-center">
        <motion.button
          whileHover={{ scale: 1.2, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="w-14 h-14 rounded-full bg-cyan-500/20 backdrop-blur-xl border-2 border-cyan-400 flex items-center justify-center text-cyan-400 text-2xl font-bold hover:bg-cyan-500/40 transition-all"
        >
          ←
        </motion.button>

        <div className="flex gap-3">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.5 }}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-12 bg-gradient-to-r from-cyan-400 to-purple-500'
                  : 'w-3 bg-gray-600 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.2, x: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="w-14 h-14 rounded-full bg-cyan-500/20 backdrop-blur-xl border-2 border-cyan-400 flex items-center justify-center text-cyan-400 text-2xl font-bold hover:bg-cyan-500/40 transition-all"
        >
          →
        </motion.button>
      </div>

      {/* Slide Counter */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-12 right-12 z-30 text-6xl font-bold font-['Orbitron']"
        style={{
          background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        {String(currentSlide + 1).padStart(2, '0')}
        <span className="text-2xl text-gray-600">/{String(slides.length).padStart(2, '0')}</span>
      </motion.div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}
