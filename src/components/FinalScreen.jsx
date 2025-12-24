"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Send, Music, Volume2, Sparkles } from "lucide-react"
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

  // Exact Audio Path from your request
  const AUDIO_PATH = "/audio/Long-Drive-Le-Chal-Slowed-Reverb-Lufi-Song-Rider-Song-slowed.m4a"

  const proposalMessage = `Jab se tum meri life mein aayi ho na, sach mein sab kuch badal gaya hai ✨... Pata nahi kaise, par tumhare hone se hi mere ordinary din colors se bhar gaye 🌈. Mere khamoshiyon ko tumne sukoon diya, aur mujhe wo khushi di jiske baare mein maine kabhi socha bhi nahi tha 🥺.

Ab har subah ek nayi umeed lagti hai kyunki mere pass tum ho ❤️. Mere sapne ab sirf mere nahi rahe, unme tumhari inspiration judi hai. Jab bhi koi mushkil samne aati hai, main bas ye sochta hoon ki tum mere saath ho, aur sab thik ho jata hai 🫂.

Hum dono jante hain ki shayad humari manzil shadi nahi hai, par mere liye tumse bada koi partner, koi dost nahi ho sakta 💍🚫. Tum meri duniya ka sabse khoobsurat hissa ho. Tumhari ek smile mera pura din bana deti hai, aur tumhare hone se main har din ek behtar insaan banna chahta hoon 🧿.

Future ka toh mujhe nahi pata ki wahan kya hoga, par ek cheez ka yakeen hai... main jo bhi future dekh raha hoon, wo tumhare bina adhura hai 🥀. 

Main har pal tumhara saath nibhana chahta hoon, as your best friend, your partner, and your everything... Forever! ❤️✨`

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause()
        setMusicPlaying(false)
      } else {
        audioRef.current.play().then(() => {
          setMusicPlaying(true)
        }).catch(e => console.log("Audio Error:", e))
      }
    }
  }

  const handleOpenCard = () => {
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
    <div className="min-h-screen bg-black overflow-hidden relative font-sans text-slate-100">
      <audio ref={audioRef} src={AUDIO_PATH} loop preload="auto" />

      {/* Floating Glowing Music Button */}
      <motion.button
        onClick={toggleMusic}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          boxShadow: musicPlaying ? "0 0 20px 5px rgba(236, 72, 153, 0.6)" : "0 0 0px 0px rgba(0,0,0,0)",
          scale: musicPlaying ? [1, 1.1, 1] : 1
        }}
        transition={{ scale: { repeat: Infinity, duration: 2 } }}
        className={`fixed top-6 right-6 z-50 p-4 rounded-full border transition-all duration-500 ${
          musicPlaying 
          ? "bg-pink-500 border-pink-300 text-white" 
          : "bg-pink-950/30 border-pink-500/50 text-pink-300"
        }`}
      >
        {musicPlaying ? <Volume2 size={24} /> : <Music size={24} />}
      </motion.button>

      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: Math.random() * 3 + "px",
              height: Math.random() * 3 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
          />
        ))}
      </div>

      <motion.div className="flex flex-col items-center justify-center px-4 py-6 relative z-10 min-h-screen">
        <div className="max-w-xl w-full mx-auto text-center">
          <AnimatePresence mode="wait">
            {!cardOpen ? (
              <motion.div key="closed" exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.5 }}>
                <motion.div 
                  className="mb-8 flex justify-center" 
                  animate={{ y: [0, -20, 0], rotate: [0, 2, -2, 0] }} 
                  transition={{ repeat: Infinity, duration: 4 }}
                >
                  <img src="/gif/msg.gif" className="w-32 drop-shadow-[0_0_25px_rgba(236,72,153,0.4)]" alt="love" />
                </motion.div>
                
                <h1 className="text-3xl text-pink-100 mb-10 font-light tracking-widest">
                  Ek khaas message, <span className="text-pink-400 font-bold">sirf tumhare liye</span>...
                </h1>
                
                <div 
                  className="cursor-pointer group relative bg-gradient-to-b from-pink-900/20 to-black border border-pink-500/30 rounded-[2.5rem] p-12 transition-all hover:border-pink-500/60 shadow-2xl" 
                  onClick={handleOpenCard}
                >
                   <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4 fill-current group-hover:scale-125 transition-transform duration-500" />
                   <p className="text-xl text-pink-200 font-medium tracking-tight">Tap to Open My Heart</p>
                   {!musicPlaying && <p className="text-xs text-pink-500/60 mt-4 italic">Music will play automatically</p>}
                </div>
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <div className="bg-zinc-900/40 backdrop-blur-3xl border border-pink-500/20 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50" />
                  <div ref={messageRef} className="h-[420px] overflow-y-auto text-left pr-4 text-pink-50 text-lg leading-relaxed whitespace-pre-line font-light italic custom-scrollbar">
                    {displayedText}
                    {!typingComplete && <span className="inline-block w-1.5 h-6 bg-pink-400 animate-pulse ml-1 shadow-[0_0_10px_pink]"></span>}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {typingComplete && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-12">
              {!showReply ? (
                <div className="space-y-8">
                  <h2 className="text-2xl text-pink-200 font-light tracking-wide">Will you stay by my side, forever? ❤️🫂</h2>
                  <motion.button
                    onClick={handleYesForever}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(236,72,153,0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-pink-600 to-rose-700 text-white px-14 py-5 rounded-full font-bold text-xl shadow-xl transition-all"
                  >
                    Yes, Forever! ❤️
                  </motion.button>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md mx-auto bg-pink-950/10 p-2 rounded-full border border-pink-500/20">
                  <div className="relative">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendToTelegram()}
                      placeholder={sent ? "Message Reached! ❤️" : "Kuch kehna chahti ho?..."}
                      disabled={sent || isSending}
                      className="w-full bg-transparent py-5 px-8 pr-16 text-white focus:outline-none placeholder-pink-300/30"
                    />
                    <button
                      onClick={sendToTelegram}
                      disabled={isSending || sent || !replyText.trim()}
                      className="absolute right-2 top-2 bottom-2 bg-pink-500 hover:bg-pink-600 p-4 rounded-full text-white transition-all disabled:opacity-30 shadow-lg"
                    >
                      {isSending ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={20} />}
                    </button>
                  </div>
                </motion.div>
              )}
              {sent && <p className="text-pink-400 mt-6 font-medium animate-pulse text-sm">💌 Your message has reached me. Thank you, precious.</p>}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
