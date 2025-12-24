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
          if (messageRef.current) messageRef.current.scrollTop = messageRef.current.scrollHeight
        } else {
          setTypingComplete(true)
          clearInterval(typingInterval)
        }
      }, 50)
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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      
      {/* Background Petals */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div key={i} initial={{ y: -50, x: Math.random() * 300 }} animate={{ y: 800, rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute text-pink-500/10 text-xl">🌸</motion.div>
        ))}
      </div>

      <div className="w-full max-w-md mx-auto text-center relative z-20">
        <AnimatePresence mode="wait">
          {!cardOpen ? (
            <motion.div key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
              <motion.div className="mb-8" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
                <img src="/gif/msg.gif" className="w-28 mx-auto drop-shadow-[0_0_20px_pink]" alt="letter" />
              </motion.div>
              <h1 className="text-2xl text-pink-100 mb-8 font-light tracking-widest uppercase italic">A Private Confession...</h1>
              <motion.div whileTap={{ scale: 0.95 }} onClick={() => { setCardOpen(true); confetti(); }} className="cursor-pointer bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-12 shadow-2xl relative">
                 <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4 fill-current drop-shadow-[0_0_10px_pink]" />
                 <p className="text-pink-100 tracking-widest font-light">TOUCH TO READ</p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative">
              {/* Message Display Area */}
              <div className={`bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 shadow-2xl transition-all duration-700 ${showPopup ? 'blur-md scale-95 opacity-20' : 'opacity-100'}`}>
                <div ref={messageRef} className="h-[380px] overflow-y-auto text-left pr-2 text-pink-50 text-[1.05rem] leading-relaxed italic font-light custom-scrollbar">
                  {displayedText}
                  {!typingComplete && <span className="inline-block w-1 h-5 bg-pink-500 animate-pulse ml-1" />}
                </div>
              </div>

              {typingComplete && !showPopup && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
                  <motion.button
                    onClick={() => { setShowPopup(true); confetti({ particleCount: 50, spread: 50 }); }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-pink-500 to-rose-600 text-white w-full py-4 rounded-full font-bold shadow-[0_0_20px_rgba(236,72,153,0.4)]"
                  >
                    YES, FOREVER! ❤️
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
              className="fixed inset-0 z-[100] flex items-center justify-center px-6 backdrop-blur-sm bg-black/60"
            >
              <motion.div 
                initial={{ scale: 0.8, y: 100 }} 
                animate={{ scale: 1, y: 0 }} 
                exit={{ scale: 0.8, y: 100 }}
                className="bg-zinc-900 border border-pink-500/30 w-full max-w-sm rounded-[2.5rem] p-6 shadow-[0_0_50px_rgba(236,72,153,0.2)] relative"
              >
                {!sent ? (
                  <>
                    <button onClick={() => setShowPopup(false)} className="absolute top-5 right-5 text-white/30 hover:text-white"><X size={20}/></button>
                    <div className="text-center mb-6 pt-4">
                      <Sparkles className="mx-auto text-pink-400 mb-2" />
                      <h3 className="text-pink-100 font-medium italic text-lg tracking-wide">Write back to me... ❤️</h3>
                    </div>
                    <textarea
                      rows={5}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your heart out..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-pink-200/20 focus:outline-none focus:ring-1 focus:ring-pink-500 italic font-light resize-none mb-4"
                    />
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={sendToTelegram}
                      disabled={isSending || !replyText.trim()}
                      className="w-full bg-pink-500 py-4 rounded-full text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20 disabled:opacity-30"
                    >
                      {isSending ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={18}/> SEND LETTER</>}
                    </motion.button>
                  </>
                ) : (
                  <div className="py-10 text-center space-y-4">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                      <CheckCircle2 size={60} className="mx-auto text-green-400" />
                    </motion.div>
                    <h3 className="text-2xl text-white font-light tracking-wide italic">Sent to My Heart!</h3>
                    <p className="text-pink-300/60 text-sm italic font-light">Refreshing in {countdown} seconds...</p>
                    <div className="w-24 h-1 bg-white/10 mx-auto rounded-full overflow-hidden">
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
