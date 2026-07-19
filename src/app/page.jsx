"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
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

  const AUDIO_PATH = "/audio/Surmedani-From-Bajre-Da-Sitta.m4a"

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setCurrentScreen("first")
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  // Force start music when clicking "Tap to Begin"
  const startMusic = () => {
    if (audioRef.current && musicStatus !== "playing") {
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

  const nextScreen = (screen) => {
    setCurrentScreen(screen)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-sans">

      {/* Global Audio (Hidden) */}
      <audio 
        ref={audioRef} 
        src={AUDIO_PATH} 
        loop 
        preload="auto" 
        onPlaying={() => setMusicStatus("playing")}
      />

      <AnimatePresence mode="wait">
        {isLoading && <CuteLoader key="loader" onComplete={() => setCurrentScreen("first")} />}

        <div className="relative z-10">
          {currentScreen === "first" && (
            <FirstScreen 
              key="first" 
              onNext={() => {
                startMusic() 
                nextScreen("question1")
              }} 
            />
          )}
          
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
          - Berlin_.fx
        </motion.div>
      )}
    </div>
  )
}
