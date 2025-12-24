"use client"
  
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Music, Volume2 } from "lucide-react"
import FirstScreen from "@/components/FirstScreen"
import QuestionScreen from "@/components/QuestionScreen"
import BalloonsScreen from "@/components/BalloonsScreen"
import PhotoScreen from "@/components/PhotoScreen"
import FinalScreen from "@/components/FinalScreen"
import CuteLoader from "@/components/CuteLoader"

export default function ProposalSite() {
  const [currentScreen, setCurrentScreen] = useState("loader")
  const [isLoading, setIsLoading] = useState(true)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const audioRef = useRef(null)

  const AUDIO_PATH = "/audio/Surmedani-From-Bajre-Da-Sitta.m4a"

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setCurrentScreen("first")
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause()
        setMusicPlaying(false)
      } else {
        audioRef.current.play().then(() => {
          setMusicPlaying(true)
        }).catch(e => console.log("Music play blocked by browser. Click anywhere first."))
      }
    }
  }

  const nextScreen = (screen) => {
    setCurrentScreen(screen)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-950/30 via-black/70 to-rose-950/40 relative overflow-hidden">
      
      {/* Global Audio Element */}
      <audio ref={audioRef} src={AUDIO_PATH} loop preload="auto" />

      {/* Global Glowing Music Button */}
      {!isLoading && (
        <motion.button
          onClick={toggleMusic}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            boxShadow: musicPlaying ? "0 0 20px 5px rgba(236, 72, 153, 0.4)" : "0 0 0px 0px rgba(0,0,0,0)"
          }}
          className={`fixed top-6 right-6 z-[100] p-3 rounded-full border transition-all duration-500 ${
            musicPlaying ? "bg-pink-500 text-white border-pink-300" : "bg-black/40 text-pink-300 border-pink-500/50"
          }`}
        >
          {musicPlaying ? <Volume2 className="animate-pulse" size={20} /> : <Music size={20} />}
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        {isLoading && <CuteLoader key="loader" onComplete={() => setCurrentScreen("first")} />}

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
      </AnimatePresence>

      {/* Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="fixed bottom-4 right-4 text-[13px] text-white/40 pointer-events-none z-50 font-light">
        -Ur Sirrr 
      </motion.div>
    </div>
  )
}
