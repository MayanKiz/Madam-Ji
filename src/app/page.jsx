"use client"
  
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Music, Volume2, Heart, Sparkles } from "lucide-react"
import FirstScreen from "@/components/FirstScreen"
import QuestionScreen from "@/components/QuestionScreen"
import BalloonsScreen from "@/components/BalloonsScreen"
import PhotoScreen from "@/components/PhotoScreen"
import FinalScreen from "@/components/FinalScreen"
import CuteLoader from "@/components/CuteLoader"

export default function ProposalSite() {
  const [currentScreen, setCurrentScreen] = useState("loader")
  const [isLoading, setIsLoading] = useState(true)
  const [musicStatus, setMusicStatus] = useState("idle") // idle, loading, playing
  const audioRef = useRef(null)

  const AUDIO_PATH = "/audio/Long-Drive-Le-Chal-Slowed-Reverb-Lufi-Song-Rider-Song-slowed.m4a"

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setCurrentScreen("first")
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleMusicRequest = () => {
    if (audioRef.current) {
      if (musicStatus === "playing") {
        audioRef.current.pause()
        setMusicStatus("idle")
      } else {
        setMusicStatus("loading")
        audioRef.current.play()
          .then(() => {
            setMusicStatus("playing")
          })
          .catch(e => {
            console.log("Error:", e)
            setMusicStatus("idle")
          })
      }
    }
  }

  const nextScreen = (screen) => {
    setCurrentScreen(screen)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-sans">
      
      {/* Global Audio */}
      <audio 
        ref={audioRef} 
        src={AUDIO_PATH} 
        loop 
        preload="auto" 
        onPlaying={() => setMusicStatus("playing")}
      />

      {/* Dynamic Music Controller */}
      {!isLoading && (
        <motion.div className="fixed top-6 right-6 z-[100]">
          <motion.button
            onClick={handleMusicRequest}
            layout
            initial={{ opacity: 0, x: 20 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              boxShadow: musicStatus === "playing" ? "0 0 20px rgba(236, 72, 153, 0.4)" : "none"
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-500 ${
              musicStatus === "playing" 
              ? "bg-pink-500 border-pink-300 text-white" 
              : "bg-white/5 border-white/20 text-pink-300"
            }`}
          >
            <AnimatePresence mode="wait">
              {musicStatus === "idle" && (
                <motion.div key="idle" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Sparkles size={14} className="animate-pulse" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Play Music</span>
                </motion.div>
              )}

              {musicStatus === "loading" && (
                <motion.div key="loading" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="text-[10px] uppercase tracking-widest">Loading...</span>
                </motion.div>
              )}

              {musicStatus === "playing" && (
                <motion.div 
                  key="playing"
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }}
                  className="flex items-center justify-center"
                >
                  {/* Dancing Bars Icon */}
                  <div className="flex gap-[2px] items-end h-4">
                    {[1, 2, 3, 4].map((bar) => (
                      <motion.div
                        key={bar}
                        className="w-[3px] bg-white rounded-full"
                        animate={{ height: [4, 16, 8, 14, 4] }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 0.6 + (bar * 0.1), 
                          ease: "easeInOut" 
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {isLoading && <CuteLoader key="loader" onComplete={() => setCurrentScreen("first")} />}

        <div className="relative z-10">
          {currentScreen === "first" && <FirstScreen key="first" onNext={() => nextScreen("question1")} />}
          {currentScreen === "question1" && (
            <QuestionScreen
              key="question1"
              question="Do you like surprises?"
              onYes={() => nextScreen("question2")}
              isFirst={true}
            />
          )}
          {currentScreen === "question2" && (
            <QuestionScreen
              key="question2"
              question="Do you like me?"
              onYes={() => nextScreen("balloons")}
              isFirst={false}
            />
          )}
          {currentScreen === "balloons" && <BalloonsScreen key="balloons" onNext={() => nextScreen("photos")} />}
          {currentScreen === "photos" && <PhotoScreen key="photos" onNext={() => nextScreen("final")} />}
          {currentScreen === "final" && <FinalScreen key="final" />}
        </div>
      </AnimatePresence>

      {/* Watermark */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          className="fixed bottom-4 right-4 text-[10px] text-white pointer-events-none z-50 tracking-widest uppercase font-light"
        >
          - Ur Sirrr
        </motion.div>
      )}
    </div>
  )
}
