"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Send, Sparkles, X, CheckCircle2, MessageSquareHeart } from "lucide-react"
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

  const proposalMessage = `Suno... ✨

Jab se tum meri life mein aayi ho na, sach mein har cheez lajawab lagne lagi hai. Pata nahi kaise samjhaun, par tumhari ye jo baatein hain, tumhari ye jo chhoti-chhoti adayein hain... 

Ye mere dil ko ek aisa sukoon deti hain jo maine kahin aur mehsoos hi nahi kiya 🧿.

Tumhari khoobsurti sirf chehre se nahi, tumhare us bholepan se hai jo tumhari har baat mein jhalakta hai 🥺. Tumhare saath waqt kaise guzar jata hai, pata hi nahi chalta. 

Tum sirf meri partner nahi, meri wo sabse pyari dost ho jise main kabhi khona nahi chahta 🫂.

Hum dono ko pata hai ki raaste shayad shadi tak na jayein, par is safar mein main tumhara har ek kadam par saath dena chahta hoon 💍🚫. 

Main chahta hoon ki tumhari har mushkil meri ho jaye, aur meri har khushi tumhari smile se shuru ho.

Tum bahut precious ho mere liye... shayad is duniya mein sabse zyada ✨. Main tumhara har roop accept karta hoon—as my best friend, my soulmate, and my everything.

I don’t know about the destination, but I promise... I want this beautiful journey only with you. ❤️✨`

  useEffect(() => {
    if (cardOpen && !typingComplete) {
      let currentIndex = 0
      const typingInterval = setInterval(() => {
        if (currentIndex < proposalMessage.length) {
          setDisplayedText(proposalMessage.slice(0, currentIndex + 1))
          currentIndex++
          if (messageRef.current) messageRef.current.scrollTop = messageRef.current.scrollHeight
        } else {
          setTypingComplete(true)
          clearInterval(typingInterval)
        }
      }, 45)
      return () => clearInterval(typingInterval)
    }
  }, [cardOpen, typingComplete])

  const sendToTelegram = async () => {
    if (!replyText.trim() || isSending) return
    setIsSending(true)
    const text = `💖 New Letter from Her: \n\n"${replyText}"`
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
          }
        }, 1000)
      }
    } catch (e) { console.error(e) } finally { setIsSending(false) }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-[#0a0a0a]">
      
      {/* --- CONTINUOUS FLOATING ELEMENTS (PETALS, HEARTS, SPARKLES) --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, x: Math.random() * 400, opacity: 0 }}
            animate={{ 
              y: 1000, 
              x: (Math.random() - 0.5) * 200, 
              rotate: 360,
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 8 + Math.random() * 10, 
              repeat: Infinity, 
              delay: Math.random() * 10,
              ease: "linear" 
            }}
            className="absolute"
          >
            {i % 3 === 0 ? (
              <span className="text-pink-400/30 text-2xl">🌸</span>
            ) : i % 3 === 1 ? (
              <Heart size={Math.random() * 15 + 10} className="text-pink-500/20 fill-current" />
            ) : (
              <Sparkles size={Math.random() * 20 + 10} className="text-purple-400/20" />
            )}
          </motion.div>
        ))}
        {/* Soft Pink Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-pink-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-md mx-auto text-center relative z-20">
        <AnimatePresence mode="wait">
          {!cardOpen ? (
            <motion.div 
              key="closed" 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              className="flex flex-col items-center"
            >
              <motion.div 
                animate={{ y: [0, -20, 0] }} 
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} 
                className="mb-8 relative"
              >
                <img src="/gif/msg.gif" className="w-28 mx-auto drop-shadow-[0_0_20px_rgba(236,72,153,0.4)]" alt="letter" />
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-2 -right-2 text-pink-400"
                >
                  ✨
                </motion.div>
              </motion.div>

              <h2 className="text-pink-100/60 text-[11px] tracking-[0.6em] mb-12 uppercase font-light">Dedicated to You</h2>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }} 
                onClick={() => { setCardOpen(true); confetti({ particleCount: 100, spread: 70 }); }} 
                className="cursor-pointer bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
              >
                 <Heart className="w-16 h-16 text-pink-500 fill-current group-hover:text-pink-400 transition-colors drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]" />
                 <p className="mt-6 text-pink-100/80 tracking-[0.3em] font-light text-[10px] uppercase">Tap to open my heart</p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className={`bg-black/60 backdrop-blur-[40px] border border-white/10 rounded-[3rem] p-8 shadow-2xl transition-all duration-700 ${showPopup ? 'blur-xl opacity-20 scale-90' : 'opacity-100 border-t-pink-500/20'}`}>
                <div ref={messageRef} className="h-[400px] overflow-y-auto text-left pr-3 text-pink-50 text-[1.05rem] leading-[1.8] italic font-light whitespace-pre-line custom-scrollbar">
                  {displayedText}
                  {!typingComplete && <motion.span animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity }} className="inline-block w-1.5 h-6 bg-pink-500 ml-1 shadow-[0_0_10px_pink]" />}
                </div>

                {typingComplete && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center gap-4">
                    <p className="text-pink-200/60 italic text-[13px] font-light">Will you stay by my side hamesha? ❤️</p>
                    <motion.button 
                      onClick={() => { setShowPopup(true); confetti({ particleCount: 60, colors: ['#ff4d6d', '#ffffff'] }); }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-pink-600 to-rose-700 text-white w-full py-4 rounded-full font-bold tracking-[0.2em] text-[11px] uppercase shadow-lg shadow-pink-900/20"
                    >
                      Yes, Hamesha! ❤️
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- SWEET REPlY POPUP --- */}
        <AnimatePresence>
          {showPopup && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/85 backdrop-blur-md">
              <motion.div 
                initial={{ scale: 0.8, y: 50 }} 
                animate={{ scale: 1, y: 0 }} 
                exit={{ scale: 0.8, opacity: 0 }} 
                className="bg-[#121212] border border-white/10 w-full max-w-sm rounded-[3rem] p-8 shadow-[0_0_60px_rgba(236,72,153,0.2)] relative overflow-hidden"
              >
                {/* Decorative glow inside popup */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/10 blur-3xl rounded-full" />
                
                <button onClick={() => { setShowPopup(false); setSent(false); }} className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors z-10">
                  <X size={24}/>
                </button>

                {!sent ? (
                  <div className="relative z-10">
                    <div className="text-center mb-8 pt-4">
                      <Sparkles className="mx-auto text-pink-400 mb-3" size={28} />
                      <h3 className="text-pink-50 font-light italic text-xl tracking-wide">Write back to me...</h3>
                    </div>
                    <textarea
                      rows={6}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your heart out..."
                      className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-6 text-white placeholder-pink-200/10 focus:outline-none focus:ring-1 focus:ring-pink-500/50 italic font-light resize-none mb-6 text-lg"
                    />
                    <button 
                      onClick={sendToTelegram} 
                      disabled={isSending || !replyText.trim()} 
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-600 py-5 rounded-full text-white font-bold tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl disabled:opacity-20 uppercase text-[10px]"
                    >
                      {isSending ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={18}/> Send Letter</>}
                    </button>
                  </div>
                ) : (
                  <div className="py-12 text-center space-y-6 relative z-10">
                    <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', damping: 10 }}>
                      <div className="w-20 h-20 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-pink-500/30">
                        <CheckCircle2 size={40} className="text-pink-400" />
                      </div>
                    </motion.div>
                    <h3 className="text-2xl text-white font-light tracking-widest italic uppercase">Received! ❤️</h3>
                    <div className="pt-4">
                      <p className="text-pink-300/40 text-[9px] tracking-[0.6em] uppercase">Refreshing in {countdown}...</p>
                      <div className="w-32 h-[1px] bg-white/10 mx-auto mt-6 overflow-hidden rounded-full">
                        <motion.div initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: 3, ease: 'linear' }} className="w-full h-full bg-pink-500" />
                      </div>
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
