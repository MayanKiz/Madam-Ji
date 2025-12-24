"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Send, Music, Volume2 } from "lucide-react"
import confetti from "canvas-confetti"

export default function FinalScreen() {
  const [cardOpen, setCardOpen] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [typingComplete, setTypingComplete] = useState(false)
  const [showReply, setShowReply] = useState(false)
  const [replyText, setReplyText] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)

  const messageRef = useRef(null)
  const audioRef = useRef(null)

  const BOT_TOKEN = "7471112121:AAHXaDVEV7dQTBdpP38OBvytroRUSu-2jYo"
  const CHAT_ID = "7643222418" 

  const proposalMessage = `Jab se tum meri life mein aayi ho na, sach mein sab kuch badal gaya hai ✨... Pata nahi kaise, par tumhare hone se hi mere ordinary din colors se bhar gaye 🌈. Mere khamoshiyon ko tumne sukoon diya, aur mujhe wo khushi di jiske baare mein maine kabhi socha bhi nahi tha 🥺.

Ab har subah ek nayi umeed lagti hai kyunki mere pass tum ho ❤️. Mere sapne ab sirf mere nahi rahe, unme tumhari inspiration judi hai. Jab bhi koi mushkil samne aati hai, main bas ye sochta hoon ki tum mere saath ho, aur sab thik ho jata hai 🫂.

Hum dono jante hain ki shayad humari manzil shadi nahi hai, par mere liye tumse bada koi partner, koi dost nahi ho sakta 💍🚫. Tum meri duniya ka sabse khoobsurat hissa ho. Tumhari ek smile mera pura din bana deti hai, aur tumhare hone se main har din ek behtar insaan banna chahta hoon 🧿.

Future ka toh mujhe nahi pata ki wahan kya hoga, par ek cheez ka yakeen hai... main jo bhi future dekh raha hoon, wo tumhare bina adhura hai 🥀. 

Main har pal tumhara saath nibhana chahta hoon, as your best friend, your partner, and your everything... Forever! ❤️✨`

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(e => console.log("Audio play error:", e))
      }
      setMusicPlaying(!musicPlaying)
    }
  }

  const handleOpenCard = () => {
    // Attempt to play if not already playing
    if (audioRef.current && !musicPlaying) {
      audioRef.current.play().catch(() => {})
      setMusicPlaying(true)
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
      }, 45)
      return () => clearInterval(typingInterval)
    }
  }, [cardOpen, typingComplete])

  const handleYesForever = () => {
    setShowReply(true)
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ["#ff4d6d", "#ff80b5", "#c084fc"] })
  }

  const sendToTelegram = async () => {
    if (!replyText.trim() || isSending) return
    setIsSending(true)
    const text = `💖 Emotional Reply: \n\n"${replyText}"`
    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}`)
      setSent(true)
      setReplyText("")
    } catch (e) { console.error(e) } finally { setIsSending(false) }
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden relative font-sans">
      <audio ref={audioRef} src="/audio/love.m4a" loop preload="auto" />

      {/* Floating Music Button */}
      <motion.button
        onClick={toggleMusic}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-6 right-6 z-50 bg-pink-500/20 backdrop-blur-md border border-pink-500/50 p-3 rounded-full text-pink-300"
      >
        {musicPlaying ? <Volume2 className="animate-pulse" /> : <Music />}
      </motion.button>

      <motion.div className="flex flex-col items-center justify-center px-4 py-6 relative z-10 min-h-screen">
        <div className="max-w-xl w-full mx-auto text-center">
          <AnimatePresence mode="wait">
            {!cardOpen ? (
              <motion.div key="closed" exit={{ opacity: 0, scale: 0.8 }}>
                <motion.div className="mb-8 flex justify-center" animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
                  <img src="/gif/msg.gif" className="w-32 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" alt="love" />
                </motion.div>
                <h1 className="text-3xl text-pink-200 mb-8 font-light tracking-wide">
                  Ek chota sa ehsas, sirf <span className="text-pink-400 font-bold underline decoration-pink-500/30">tumhare liye</span>...
                </h1>
                
                {!musicPlaying && (
                  <p className="text-pink-400/80 text-sm mb-4 animate-bounce">Please turn on music from top right ↗️</p>
                )}

                <div className="cursor-pointer group relative bg-pink-950/10 backdrop-blur-xl border border-pink-500/20 rounded-[2rem] p-10 overflow-hidden" onClick={handleOpenCard}>
                   <div className="absolute inset-0 bg-pink-500/5 group-hover:bg-pink-500/10 transition-colors" />
                   <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4 fill-current group-hover:scale-110 transition-transform" />
                   <p className="text-xl text-pink-200 font-medium">Tap to feel my heart</p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="bg-pink-950/20 backdrop-blur-2xl border border-pink-500/30 rounded-[2.5rem] p-8 shadow-[0_0_50px_rgba(236,72,153,0.15)] relative">
                  <div className="absolute -top-4 -left-4 text-3xl">✨</div>
                  <div className="absolute -bottom-4 -right-4 text-3xl">✨</div>
                  <div ref={messageRef} className="h-[400px] overflow-y-auto text-left pr-3 text-pink-50 text-lg leading-relaxed whitespace-pre-line font-medium custom-scrollbar">
                    {displayedText}
                    {!typingComplete && <span className="inline-block w-2 h-6 bg-pink-400 animate-pulse ml-1 shadow-[0_0_8px_rgba(236,72,153,1)]"></span>}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {typingComplete && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10">
              {!showReply ? (
                <div className="space-y-6">
                  <h2 className="text-2xl text-pink-200 font-medium italic">Will you be my partner in everything? ❤️</h2>
                  <motion.button
                    onClick={handleYesForever}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-12 py-4 rounded-full shadow-[0_10px_30px_rgba(236,72,153,0.4)] font-bold text-xl"
                  >
                    Yes, Forever & Always!
                  </motion.button>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-auto">
                  <div className="relative">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendToTelegram()}
                      placeholder={sent ? "😋! ❤️" : "Apne dil ki baat likho..."}
                      disabled={sent || isSending}
                      className="w-full bg-white/10 border border-pink-500/40 rounded-full py-5 px-8 pr-16 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 backdrop-blur-md transition-all"
                    />
                    <button
                      onClick={sendToTelegram}
                      disabled={isSending || sent || !replyText.trim()}
                      className="absolute right-3 top-3 bottom-3 bg-pink-500 hover:bg-pink-600 p-3 rounded-full text-white transition-all disabled:opacity-50"
                    >
                      {isSending ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={20} />}
                    </button>
                  </div>
                  {sent && <p className="text-pink-300 mt-4 italic animate-pulse">Your Reply Sent SuccEssFuLlyyy</p>}
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
