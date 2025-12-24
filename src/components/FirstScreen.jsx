"use client"

import { motion } from "motion/react"
import { Heart } from "lucide-react"
import { useRef } from "react"

export default function FirstScreen({ onNext }) {
    const audioRef = useRef(null)

    const handleClick = () => {
        if (audioRef.current) {
            audioRef.current.volume = 0.6
            audioRef.current.play().catch(() => {})
        }
        onNext()
    }

    return (
        <>
            <audio ref={audioRef} src="/audio/hjbg.mp3" loop />

            <motion.div
                className="min-h-screen flex flex-col items-center justify-center px-4 py-6 relative z-10 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="text-center max-w-3xl mx-auto">
                    <motion.h1
                        className="text-4xl md:text-6xl text-pink-200 mb-6 font-semibold"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    >
                        I have something{" "}
                        <span className="font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                            special
                        </span>{" "}
                        to tell you...
                    </motion.h1>

                    <motion.p
                        className="text-pink-200/70 text-xl md:text-2xl mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                    >
                        Something that will change everything ✨
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2, duration: 0.5 }}
                    >
                        <button
                            onClick={handleClick}
                            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg flex items-center justify-center mx-auto"
                        >
                            <Heart className="w-5 h-5 mr-2" />
                            Tap to Begin
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </>
    )
}