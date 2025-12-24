"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"
import confetti from "canvas-confetti"

export default function FinalScreen() {
  const [cardOpen, setCardOpen] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [typingComplete, setTypingComplete] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)

  const messageRef = useRef(null)
  const audioRef = useRef(null)

  const proposalMessage = `From the moment you came into my life, everything started to change.  
You brought colors to my ordinary days, warmth to my silence, and a happiness I didn’t even know I was missing.  

Every sunrise feels brighter because of you.  
Every dream feels possible because you inspire me.  
Every challenge feels easier because I imagine you by my side.  

You are not just my friend, you’re the most special part of my life.  
You make me smile, you make my heart race, and you make me want to be a better version of myself.  

I don’t know what the future holds, but I know one thing for sure.
I want that future with you.`

  useEffect(() => {
    if (cardOpen && !typingComplete) {
      let currentIndex = 0
      const typingInterval = setInterval(() => {
        if (currentIndex < proposalMessage.length) {
          setDisplayedText(proposalMessage.slice(0, currentIndex + 1))
          currentIndex++

          if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight
          }
        } else {
          setTypingComplete(true)
          clearInterval(typingInterval)
        }
      }, 30)

      return () => clearInterval(typingInterval)
    }
  }, [cardOpen, typingComplete, proposalMessage])

  const handleYesForever = () => {
    setShowOverlay(true)

    const colors = ["#ff4d6d", "#ff80b5", "#c084fc", "#a855f7", "#f472b6", "#fb7185"]
    const count = 200
    const defaults = { origin: { y: 0.8 }, colors }

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      })
    }

    fire(0.25, { spread: 26, startVelocity: 55 })
    fire(0.2, { spread: 60 })
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
    fire(0.1, { spread: 120, startVelocity: 45 })
  }

  return (
    <>
      {/* Audio */}
      <audio ref={audioRef} src="/audio/love.m4a" preload="auto" />

      <motion.div
        className="min-h-screen flex flex-col items-center justify-center px-4 py-6 relative z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-xl w-full mx-auto text-center">
          <AnimatePresence mode="wait">
            {!cardOpen ? (
              <motion.div key="closed" exit={{ opacity: 0 }}>
                <motion.div
                  className="mb-8 flex justify-center"
                  animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <img src="/gif/msg.gif" className="w-28" alt="envelope" />
                </motion.div>

                <h1 className="text-3xl md:text-4xl text-pink-200 mb-8 font-semibold">
                  This is just for <span className="text-pink-400 font-bold">you...</span>
                </h1>

                <div
                  className="cursor-pointer transition-all duration-300 hover:scale-105 bg-pink-950/20 backdrop-blur-md border border-pink-500/30 rounded-3xl p-8 mx-auto"
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = 0
                      audioRef.current.volume = 0.6
                      audioRef.current.play().catch(() => {})
                    }
                    setCardOpen(true)
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4 fill-current" />
                  </motion.div>
                  <p className="text-lg text-pink-300">Tap to see what’s inside</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div className="bg-pink-950/20 backdrop-blur-md border border-pink-500/30 rounded-3xl p-8">
                  <div
                    ref={messageRef}
                    className="h-80 overflow-y-auto text-left pr-2"
                  >
                    <div className="text-pink-200 whitespace-pre-line">
                      {displayedText}
                      {!typingComplete && (
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        >
                          |
                        </motion.span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {typingComplete && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="mt-10"
              >
                <h2 className="text-2xl md:text-3xl bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-8 font-semibold">
                  So, Will you be mine forever?
                </h2>

                <motion.button
                  onClick={handleYesForever}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 text-xl font-semibold rounded-full shadow-2xl flex items-center justify-center mx-auto"
                >
                  <Heart className="w-5 h-5 mr-2 fill-current" />
                  Yes, forever!
                  <Heart className="w-5 h-5 ml-2 fill-current" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  )
}