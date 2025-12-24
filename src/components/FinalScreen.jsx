"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Send, X, CheckCircle2 } from "lucide-react"
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
          }
        }, 1000)
      }
    } catch (e) { console.error(e) } finally { setIsSending(false) }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-[#0a0a0a]">
      
      {/* --- CONTINUOUS RAIN (🌺, 🌸, 🌼) --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, x: Math.random() * 400, opacity: 0 }}
            animate={{ 
              y: 1000, 
              x: (Math.random() - 0.5) * 150, 
              rotate: 360,
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 7 + Math.random() * 8, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "linear" 
            }}
            className="absolute text-2xl"
          >
            {i % 3 === 0 ? "🌺" : i % 3 === 1 ? "🌼" : "🌸"}
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-md mx-auto text-center relative z-20">
        <AnimatePresence mode="wait">
          {!cardOpen ? (
            <motion.div key="closed" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}>
              <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="mb-8">
                <img src="/gif/msg.gif" className="w-28 mx-auto drop-shadow-[0_0_20px_pink]" alt="letter" />
              </motion.div>
              <h2 className="text-pink-100/40 text-[11px] tracking-[0.5em] mb-12 uppercase font-light italic text-center">Touch My Soul</h2>
              <motion.div 
                whileTap={{ scale: 0.9 }} 
                onClick={() => { setCardOpen(true); confetti(); }} 
                className="cursor-pointer bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-12 shadow-2xl group"
              >
                 <Heart className="w-16 h-16 text-pink-500 fill-current drop-shadow-[0_0_15px_pink]" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
              <div className={`bg-black/60 backdrop-blur-[35px] border border-white/10 rounded-[3rem] p-8 shadow-2xl transition-all duration-700 ${showPopup ? 'blur-xl opacity-20 scale-90' : 'opacity-100 border-t-pink-500/20'}`}>
                <div ref={messageRef} className="h-[400px] overflow-y-auto text-left pr-3 text-pink-50 text-[1.05rem] leading-[1.8] italic font-light whitespace-pre-line custom-scrollbar">
                  {displayedText}
                  {!typingComplete && <motion.span animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity }} className="inline-block w-1.5 h-6 bg-pink-500 ml-1 shadow-[0_0_10px_pink]" />}
                </div>

                {typingComplete && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center gap-4">
                    <p className="text-pink-200/60 italic text-[13px] font-light">Will you stay by my side hamesha? ❤️</p>
                    <motion.button 
                      onClick={() => { setShowPopup(true); confetti({ particleCount: 60 }); }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-pink-600 to-rose-700 text-white w-full py-4 rounded-full font-bold tracking-[0.2em] text-[11px] uppercase shadow-lg"
                    >
                      Yes, Hamesha! ❤️
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- POPUP AREA --- */}
        <AnimatePresence>
          {showPopup && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/85 backdrop-blur-md">
              <motion.div initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0 }} className="bg-[#121212] border border-white/10 w-full max-w-sm rounded-[3rem] p-8 shadow-2xl relative">
                
                <button onClick={() => { setShowPopup(false); setSent(false); }} className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors">
                  <X size={24}/>
                </button>

                {!sent ? (
                  <>
                    <div className="text-center mb-8 pt-4 italic">
                       <h3 className="text-pink-50 font-light text-xl tracking-wide underline decoration-pink-500/30 underline-offset-8">Leave a Letter</h3>
                    </div>
                    <textarea
                      rows={6}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply here..."
                      className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-6 text-white placeholder-pink-200/5 focus:outline-none focus:ring-1 focus:ring-pink-500/40 italic font-light resize-none mb-6 text-lg"
                    />
                    <button 
                      onClick={sendToTelegram} 
                      disabled={isSending || !replyText.trim()} 
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-600 py-5 rounded-full text-white font-bold tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl disabled:opacity-20 uppercase text-[10px]"
                    >
                      {isSending ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={18}/> Send Letter</>}
                    </button>
                  </>
                ) : (
                  <div className="py-12 text-center space-y-6">
                    <CheckCircle2 size={60} className="mx-auto text-pink-500" />
                    <h3 className="text-2xl text-white font-light tracking-widest italic uppercase">Sent! ❤️</h3>
                    <p className="text-pink-300/40 text-[9px] tracking-[0.6em] uppercase underline underline-offset-4">Resetting in {countdown}...</p>
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
