"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Send } from "lucide-react"
import confetti from "canvas-confetti"

export default function FinalScreen() {
  const [cardOpen, setCardOpen] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [typingComplete, setTypingComplete] = useState(false)
  const [showReply, setShowReply] = useState(false)
  const [replyText, setReplyText] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [sent, setSent] = useState(false)

  const messageRef = useRef(null)
  const audioRef = useRef(null)

  // Telegram Config
  const BOT_TOKEN = "7471112121:AAHXaDVEV7dQTBdpP38OBvytroRUSu-2jYo"
  const CHAT_ID = "7643222418" 

  const proposalMessage = `From the moment you came into my life, everything started to change.  
You brought colors to my ordinary days, warmth to my silence, and a happiness I didn’t even know I was missing.  

Every sunrise feels brighter because of you.  
Every dream feels possible because you inspire me.  
Every challenge feels easier because I imagine you by my side.  

You are not just my friend, you’re the most special part of my life.  
You make me smile, you make my heart race, and you make me want to be a better version of myself.  

I don’t know what the future holds, but I know one thing for sure.
I want that future with you.`

  const handleOpenCard = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.volume = 0.6
      audioRef.current.play().catch((e) => console.log("Audio block:", e))
    }
    setCardOpen(true)
  }

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
  }, [cardOpen, typingComplete])

  const handleYesForever = () => {
    setShowReply(true)
    const colors = ["#ff4d6d", "#ff80b5", "#c084fc", "#f472b6"]
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors })
  }

  const sendToTelegram = async () => {
    if (!replyText.trim() || isSending) return
    setIsSending(true)
    
    const text = `💖 New Reply from your Special Someone: \n\n"${replyText}"`
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}`

    try {
      const response = await fetch(url)
      if (response.ok) {
        setSent(true)
        setReplyText("")
      }
    } catch (error) {
      console.error("Error sending to TG:", error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      {/* Audio File */}
      <audio ref={audioRef} src="/audio/love.m4a" preload="auto" playsInline />

      <motion.div className="min-h-screen flex flex-col items-center justify-center px-4 py-6 relative z-10">
        <div className="max-w-xl w-full mx-auto text-center">
          <AnimatePresence mode="wait">
            {!cardOpen ? (
              <motion.div key="closed" exit={{ opacity: 0 }}>
                <motion.div className="mb-8 flex justify-center" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <img src="/gif/msg.gif" className="w-28" alt="envelope" />
                </motion.div>
                <h1 className="text-3xl text-pink-200 mb-8 font-semibold">This is just for <span className="text-pink-400">you...</span></h1>
                <div className="cursor-pointer bg-pink-950/20 backdrop-blur-md border border-pink-500/30 rounded-3xl p-8" onClick={handleOpenCard}>
                  <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4 fill-current" />
                  <p className="text-lg text-pink-300">Tap to see what’s inside</p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="bg-pink-950/20 backdrop-blur-md border border-pink-500/30 rounded-3xl p-8 shadow-2xl">
                  <div ref={messageRef} className="h-80 overflow-y-auto text-left pr-2 text-pink-100 text-lg leading-relaxed whitespace-pre-line">
                    {displayedText}
                    {!typingComplete && <span className="inline-block w-2 h-5 bg-pink-400 animate-pulse ml-1"></span>}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {typingComplete && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8">
              {!showReply ? (
                <>
                  <h2 className="text-2xl text-pink-300 mb-6 font-semibold drop-shadow-sm">So, Will you be mine forever?</h2>
                  <motion.button
                    onClick={handleYesForever}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 text-xl font-bold rounded-full shadow-lg flex items-center mx-auto"
                  >
                    <Heart className="mr-2 fill-current w-5 h-5" /> Yes, forever! <Heart className="ml-2 fill-current w-5 h-5" />
                  </motion.button>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md mx-auto">
                  <p className="text-pink-300 mb-4 font-medium">Leave a message for me:</p>
                  <div className="relative group">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendToTelegram()}
                      placeholder={sent ? "Message sent! ❤️" : "Type your reply..."}
                      disabled={sent || isSending}
                      className="w-full bg-pink-950/40 border border-pink-500/50 rounded-full py-4 px-6 pr-14 text-white placeholder-pink-300/40 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                    />
                    <button
                      onClick={sendToTelegram}
                      disabled={isSending || sent || !replyText.trim()}
                      className="absolute right-2 top-2 bottom-2 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-600 p-3 rounded-full transition-all flex items-center justify-center"
                    >
                      {isSending ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send className="w-5 h-5 text-white" />
                      )}
                    </button>
                  </div>
                  {sent && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-pink-400 mt-3 text-sm italic font-medium">
                      Got it! Check your Telegram, the message is on its way. 💌
                    </motion.p>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  )
}
