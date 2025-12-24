"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Send, Sparkles } from "lucide-react"
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

  const BOT_TOKEN = "7471112121:AAHXaDVEV7dQTBdpP38OBvytroRUSu-2jYo"
  const CHAT_ID = "7643222418" 

  const proposalMessage = `Suno... ✨
Jab se tum meri life mein aayi ho na, sach mein har cheez lajawab lagne lagi hai. Pata nahi kaise samjhaun, par tumhari ye jo baatein hain, tumhari ye jo chhoti-chhoti adayein hain... ye mere dil ko ek aisa sukoon deti hain jo maine kahin aur mehsoos hi nahi kiya 🧿.

Tumhari khoobsurti sirf chehre se nahi, tumhare us bholepan se hai jo tumhari har baat mein jhalakta hai 🥺. Tumhare saath waqt kaise guzar jata hai, pata hi nahi chalta. Tum sirf meri partner nahi, meri wo sabse pyari dost ho jise main kabhi khona nahi chahta 🫂.

Hum dono ko pata hai ki raaste shayad shadi tak na jayein, par is safar mein main tumhara har ek kadam par saath dena chahta hoon 💍🚫. Main chahta hoon ki tumhari har mushkil meri ho jaye, aur meri har khushi tumhari smile se shuru ho.

Tum bahut precious ho mere liye... shayad is duniya mein sabse zyada ✨. Main tumhara har roop accept karta hoon—as my best friend, my soulmate, and my everything.

I don’t know about the destination, but I promise... I want this beautiful journey only with you. ❤️✨`

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
      }, 50) 
      return () => clearInterval(typingInterval)
    }
  }, [cardOpen, typingComplete])

  const handleYesForever = () => {
    setShowReply(true)
    confetti({ 
      particleCount: 200, 
      spread: 90, 
      origin: { y: 0.7 }, 
      colors: ["#ff4d6d", "#ff80b5", "#f472b6", "#ffffff"] 
    })
  }

  const sendToTelegram = async () => {
    if (!replyText.trim() || isSending) return
    setIsSending(true)
    const text = `💖 Heartfelt Reply: \n\n"${replyText}"`
    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}`)
      setSent(true)
      setReplyText("")
    } catch (e) { console.error(e) } finally { setIsSending(false) }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      
      {/* Background Petals Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, x: Math.random() * 400, rotate: 0 }}
            animate={{ y: 1000, x: (Math.random() - 0.5) * 200, rotate: 360 }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
            className="absolute text-pink-500/20 text-2xl"
          >
            🌸
          </motion.div>
        ))}
      </div>

      <div className="max-w-2xl w-full mx-auto text-center relative z-20">
        <AnimatePresence mode="wait">
          {!cardOpen ? (
            <motion.div key="closed" exit={{ opacity: 0, scale: 0.9, y: -20 }} transition={{ duration: 0.8 }}>
              <motion.div 
                className="mb-10 flex justify-center" 
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} 
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <div className="relative">
                    <img src="/gif/msg.gif" className="w-36 drop-shadow-[0_0_30px_rgba(236,72,153,0.6)]" alt="letter" />
                    <motion.div animate={{ opacity: [0, 1, 0] }} className="absolute -top-4 -right-4 text-pink-400"><Sparkles /></motion.div>
                </div>
              </motion.div>
              
              <h1 className="text-4xl text-pink-100 mb-12 font-extralight tracking-[0.2em] uppercase">
                A Soulful <span className="text-pink-400 font-bold">Confession</span>
              </h1>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                onClick={() => setCardOpen(true)}
                className="cursor-pointer bg-white/5 backdrop-blur-md border border-white/10 rounded-[3rem] p-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group overflow-hidden relative"
              >
                 <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                 <Heart className="w-20 h-20 text-pink-500 mx-auto mb-6 fill-current drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" />
                 <p className="text-2xl text-pink-50 font-light tracking-widest">Touch My Heart</p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <div className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 shadow-2xl relative border-t-pink-500/30">
                <div className="absolute top-6 right-8 text-pink-500/40"><Sparkles size={30} /></div>
                <div ref={messageRef} className="h-[450px] overflow-y-auto text-left pr-4 text-pink-50 text-xl leading-relaxed whitespace-pre-line font-light italic custom-scrollbar selection:bg-pink-500/30">
                  {displayedText}
                  {!typingComplete && <motion.span animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity }} className="inline-block w-1.5 h-7 bg-pink-500 ml-2 shadow-[0_0_15px_pink]" />}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {typingComplete && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mt-14">
            {!showReply ? (
              <div className="space-y-10">
                <h2 className="text-3xl text-pink-100 font-extralight tracking-widest italic">Will you be mine, in every way? ❤️🫂</h2>
                <motion.button
                  onClick={handleYesForever}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(236,72,153,0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-pink-500 via-rose-600 to-pink-700 text-white px-20 py-6 rounded-full font-bold text-2xl shadow-2xl transition-all uppercase tracking-tighter"
                >
                  Yes, Hamesha! ❤️
                </motion.button>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-xl mx-auto bg-white/5 backdrop-blur-md p-4 rounded-[2.5rem] border border-white/10 shadow-2xl">
                <div className="relative">
                  <textarea
                    rows={5}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={sent ? "I'm reading your heart right now... ❤️" : "Apne dil ki baat likho... (Main intezar kar raha hoon)"}
                    disabled={sent || isSending}
                    className="w-full bg-transparent p-6 text-white text-lg focus:outline-none placeholder-pink-200/20 resize-none custom-scrollbar italic font-light"
                  />
                  <div className="flex justify-end p-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={sendToTelegram}
                      disabled={isSending || sent || !replyText.trim()}
                      className="bg-pink-500 hover:bg-pink-600 p-5 rounded-full text-white transition-all disabled:opacity-20 shadow-[0_0_20px_rgba(236,72,153,0.5)]"
                    >
                      {isSending ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={24} />}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
            {sent && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-pink-400 mt-8 font-light tracking-widest italic animate-pulse">Your beautiful words have reached my heart... ❤️</motion.p>}
          </motion.div>
        )}
      </div>
    </div>
  )
}
