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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-black/40">
      
      {/* 24/7 Petals Falling */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, x: Math.random() * 400 }}
            animate={{ y: 950, x: (Math.random() - 0.5) * 150, rotate: 360 }}
            transition={{ duration: 10 + Math.random() * 8, repeat: Infinity, ease: "linear" }}
            className="absolute text-pink-500/10 text-xl"
          >
            🌸
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-md mx-auto text-center relative z-20">
        <AnimatePresence mode="wait">
          {!cardOpen ? (
            <motion.div key="closed" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="mb-6">
                <img src="/gif/msg.gif" className="w-24 mx-auto" alt="letter" />
              </motion.div>
              <h2 className="text-pink-100/40 text-[10px] tracking-[0.5em] mb-10 uppercase font-light">From My Soul</h2>
              <motion.div 
                whileTap={{ scale: 0.9 }} 
                onClick={() => { setCardOpen(true); confetti(); }} 
                className="cursor-pointer bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full p-12 shadow-[0_0_30px_rgba(236,72,153,0.2)] group"
              >
                 <Heart className="w-14 h-14 text-pink-500 fill-current group-hover:scale-110 transition-transform" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className={`bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-7 shadow-2xl transition-all duration-700 ${showPopup ? 'blur-xl opacity-20 scale-90' : 'opacity-100'}`}>
                <div ref={messageRef} className="h-[400px] overflow-y-auto text-left pr-2 text-pink-50 text-[1.05rem] leading-[1.8] italic font-light whitespace-pre-line custom-scrollbar">
                  {displayedText}
                  {!typingComplete && <motion.span animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity }} className="inline-block w-1 h-5 bg-pink-500 ml-1 shadow-[0_0_8px_pink]" />}
                </div>

                {/* --- YES BUTTON TRIGGER --- */}
                {typingComplete && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-6 border-t border-white/5 space-y-6">
                    <p className="text-pink-200/80 italic text-sm font-light tracking-wide animate-pulse">Will you be my partner in everything? ❤️</p>
                    <motion.button 
                      onClick={() => { setShowPopup(true); confetti({ particleCount: 50 }); }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-pink-600 to-rose-700 text-white w-full py-4 rounded-full font-bold tracking-widest text-xs uppercase shadow-lg shadow-pink-900/40"
                    >
                      Yes, Hamesha! ❤️
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- POPUP OVERLAY --- */}
        <AnimatePresence>
          {showPopup && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/90 backdrop-blur-md">
              <motion.div initial={{ scale: 0.8, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0 }} className="bg-zinc-950 border border-white/10 w-full max-w-sm rounded-[2.5rem] p-8 shadow-[0_0_50px_rgba(236,72,153,0.15)] relative">
                
                <button onClick={() => { setShowPopup(false); setSent(false); }} className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors">
                  <X size={24}/>
                </button>

                {!sent ? (
                  <>
                    <div className="text-center mb-8 pt-4">
                      <MessageSquareHeart className="mx-auto text-pink-500 mb-2 animate-bounce" size={32} />
                      <h3 className="text-pink-50 font-light italic text-xl tracking-wide">Tell me your heart...</h3>
                    </div>
                    <textarea
                      rows={6}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Likho jo bhi dil mein hai..."
                      className="w-full bg-white/5 border border-white/10 rounded-3xl p-5 text-white placeholder-pink-200/5 focus:outline-none focus:ring-1 focus:ring-pink-500 italic font-light resize-none mb-6 text-lg"
                    />
                    <button 
                      onClick={sendToTelegram} 
                      disabled={isSending || !replyText.trim()} 
                      className="w-full bg-pink-600 py-5 rounded-full text-white font-bold tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl disabled:opacity-20 uppercase text-[10px]"
                    >
                      {isSending ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={18}/> Send to Him</>}
                    </button>
                  </>
                ) : (
                  <div className="py-12 text-center space-y-6">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle2 size={70} className="mx-auto text-pink-500" />
                    </motion.div>
                    <h3 className="text-2xl text-white font-light tracking-widest italic uppercase">Received! ❤️</h3>
                    <div className="pt-4">
                      <p className="text-pink-300/40 text-[9px] tracking-[0.5em] uppercase">Refreshing in {countdown}...</p>
                      <div className="w-32 h-[1px] bg-white/10 mx-auto mt-4 overflow-hidden rounded-full">
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
