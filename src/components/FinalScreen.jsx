"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Send, Sparkles, X, CheckCircle2 } from "lucide-react"
import confetti from "canvas-confetti"

export default function FinalScreen() {
  const [cardOpen, setCardOpen] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [typingComplete, setTypingComplete] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [replyText, setReplyText] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [countdown, setCountdown] = useState(3)

  const messageRef = useRef(null)

  const BOT_TOKEN = "7471112121:AAHXaDVEV7dQTBdpP38OBvytroRUSu-2jYo"
  const CHAT_ID = "7643222418" 

  // Line breaks fix ke liye message ko template literal me properly format kiya hai
  const proposalMessage = `Suno... ✨

Jab se tum meri life mein aayi ho na, sach mein har cheez lajawab lagne lagi hai. Pata nahi kaise samjhaun, par tumhari ye jo baatein hain, tumhari ye jo chhoti-chhoti adayein hain... 

Ye mere dil ko ek aisa sukoon deti hain jo maine kahin aur mehsoos hi nahi kiya 🧿.

Tumhari khoobsurti sirf chehre se nahi, tumhare us bholepan se hai jo tumhari har baat mein jhalakta hai 🥺. Tumhare saath waqt kaise guzar jata hai, pata hi nahi chalta. 

Tum sirf meri partner nahi, meri wo sabse pyari dost ho jise main kabhi khona nahi chahta 🫂.

Hum dono ko pata hai ki raaste shayad shadi tak na jayein, par is safar mein main tumhara har ek kadam par saath dena chahta hoon 💍🚫. 

Main chahta hoon ki tumhari har mushkil meri ho jaye, aur meri har khushi tumhari smile se shuru ho.

Tum bahut precious ho mere liye... shayad is duniya mein sabse zyada ✨. Main tumhara har roop accept karta hoon—as my best friend, my soulmate, and my everything.

I don’t know about the destination, but I promise... I want this beautiful journey only with you. ❤️✨`

  // Typing effect logic
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
      }, 40)
      return () => clearInterval(typingInterval)
    }
  }, [cardOpen, typingComplete])

  const sendToTelegram = async () => {
    if (!replyText.trim() || isSending) return
    setIsSending(true)
    const text = `💖 Letter from her: \n\n"${replyText}"`
    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}`)
      if (res.ok) {
        setSent(true)
        let count = 3
        const interval = setInterval(() => {
          count -= 1
          setCountdown(count)
          if (count === 0) {
            clearInterval(interval)
            setSent(false)
            setReplyText("")
            setCountdown(3)
            setShowPopup(false) // Optionally close after reset
          }
        }, 1000)
      }
    } catch (e) { console.error(e) } finally { setIsSending(false) }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-black/40">
      
      {/* Background Petals - Hamesha chalti rahengi */}
      <div className="absolute inset-0 pointer-events-none z-0">
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

      <div className="w-full max-w-md mx-auto text-center relative z-20">
        <AnimatePresence mode="wait">
          {!cardOpen ? (
            <motion.div 
              key="closed" 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <motion.div 
                className="mb-10" 
                animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }} 
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <img src="/gif/msg.gif" className="w-32 mx-auto drop-shadow-[0_0_25px_rgba(236,72,153,0.5)]" alt="letter" />
              </motion.div>

              <h1 className="text-3xl text-pink-100 mb-10 font-light tracking-[0.15em] uppercase italic">
                A Private <span className="text-pink-400 font-bold">Confession</span>
              </h1>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }} 
                onClick={() => { setCardOpen(true); confetti(); }} 
                className="cursor-pointer bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-14 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group"
              >
                 <div className="absolute inset-0 bg-pink-500/5 group-hover:bg-pink-500/10 transition-colors" />
                 <Heart className="w-20 h-20 text-pink-500 mx-auto mb-4 fill-current drop-shadow-[0_0_15px_pink]" />
                 <p className="text-pink-100 tracking-widest font-light text-sm">TAP TO FEEL MY HEART</p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="open" 
              initial={{ opacity: 0, scale: 0.9, y: 50 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              className="relative"
            >
              {/* Message Display - Glassmorphism Card */}
              <div className={`bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 shadow-2xl transition-all duration-700 ${showPopup ? 'blur-lg scale-90 opacity-20' : 'opacity-100 border-t-pink-500/30'}`}>
                <div ref={messageRef} className="h-[420px] overflow-y-auto text-left pr-3 text-pink-50 text-[1.1rem] leading-relaxed italic font-light custom-scrollbar whitespace-pre-line">
                  {displayedText}
                  {!typingComplete && <motion.span animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity }} className="inline-block w-1.5 h-6 bg-pink-500 ml-1 shadow-[0_0_10px_pink]" />}
                </div>
              </div>

              {typingComplete && !showPopup && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="mt-10"
                >
                  <motion.button
                    onClick={() => { setShowPopup(true); confetti({ particleCount: 100, spread: 70 }); }}
                    whileHover={{ scale: 1.05, boxShadow: "0_0_30px_rgba(236,72,153,0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-pink-500 via-rose-600 to-pink-700 text-white w-full py-5 rounded-full font-bold text-lg shadow-2xl uppercase tracking-widest"
                  >
                    Yes, Hamesha! ❤️
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- POPUP OVERLAY --- */}
        <AnimatePresence>
          {showPopup && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center px-6 backdrop-blur-md bg-black/70"
            >
              <motion.div 
                initial={{ scale: 0.7, y: 100, rotate: -5 }} 
                animate={{ scale: 1, y: 0, rotate: 0 }} 
                exit={{ scale: 0.5, opacity: 0 }}
                className="bg-zinc-900/90 border border-pink-500/30 w-full max-w-sm rounded-[3rem] p-8 shadow-[0_0_60px_rgba(236,72,153,0.3)] relative"
              >
                {!sent ? (
                  <>
                    <button onClick={() => setShowPopup(false)} className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors"><X size={24}/></button>
                    <div className="text-center mb-8 pt-4">
                      <Sparkles className="mx-auto text-pink-400 mb-3" size={28} />
                      <h3 className="text-pink-100 font-light italic text-xl tracking-wide">Leave a letter for me...</h3>
                    </div>
                    <textarea
                      rows={6}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your heart out..."
                      className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-6 text-white placeholder-pink-200/10 focus:outline-none focus:ring-2 focus:ring-pink-500/50 italic font-light resize-none mb-6 text-lg"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={sendToTelegram}
                      disabled={isSending || !replyText.trim()}
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-600 py-5 rounded-full text-white font-bold flex items-center justify-center gap-3 shadow-xl disabled:opacity-30 tracking-widest uppercase"
                    >
                      {isSending ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={20}/> SEND LOVE</>}
                    </motion.button>
                  </>
                ) : (
                  <div className="py-12 text-center space-y-6">
                    <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', damping: 12 }}>
                      <CheckCircle2 size={80} className="mx-auto text-pink-400" />
                    </motion.div>
                    <h3 className="text-2xl text-white font-light tracking-widest italic">Message Sent! ❤️</h3>
                    <p className="text-pink-300/60 text-sm italic font-light">Refreshing in {countdown} seconds...</p>
                    <div className="w-32 h-1 bg-white/5 mx-auto rounded-full overflow-hidden">
                       <motion.div initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: 3, ease: 'linear' }} className="w-full h-full bg-pink-500" />
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
