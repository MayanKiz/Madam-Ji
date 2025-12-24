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

  const BOT_TOKEN = "7471112121:AAHXaDVEV7dQTBdpP38OBvytroRUSu-2jYo"
  const CHAT_ID = "7643222418" 

  const proposalMessage = `Jab se tum meri life mein aayi ho na, sach mein sab kuch badal gaya hai ✨... Pata nahi kaise, par tumhare hone se hi mere ordinary din colors se bhar gaye 🌈. Mere khamoshiyon ko tumne sukoon diya, aur mujhe wo khushi di jiske baare mein maine kabhi socha bhi nahi tha 🥺.

Ab har subah ek nayi umeed lagti hai kyunki mere pass tum ho ❤️. Mere sapne ab sirf mere nahi rahe, unme tumhari inspiration judi hai. Jab bhi koi mushkil samne aati hai, main bas ye sochta hoon ki tum mere saath ho, aur sab thik ho jata hai 🫂.

Hum dono jante hain ki shayad humari manzil shadi nahi hai, par mere liye tumse bada koi partner, koi dost nahi ho sakta 💍🚫. Tum meri duniya ka sabse khoobsurat hissa ho. Tumhari ek smile mera pura din bana deti hai, aur tumhare hone se main har din ek behtar insaan banna chahta hoon 🧿.

Future ka toh mujhe nahi pata ki wahan kya hoga, par ek cheez ka yakeen hai... main jo bhi future dekh raha hoon, wo tumhare bina adhura hai 🥀. 

Main har pal tumhara saath nibhana chahta hoon, as your best friend, your partner, and your everything... Forever! ❤️✨`

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
    <div className="flex flex-col items-center justify-center px-4 py-6 relative z-10 w-full">
      <div className="max-w-xl w-full mx-auto text-center">
        <AnimatePresence mode="wait">
          {!cardOpen ? (
            <motion.div key="closed" exit={{ opacity: 0, scale: 0.8 }}>
              <motion.div className="mb-8 flex justify-center" animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
                <img src="/gif/msg.gif" className="w-32 drop-shadow-[0_0_20px_pink]" alt="love" />
              </motion.div>
              <h1 className="text-3xl text-pink-100 mb-10 font-light tracking-widest">
                A Message for <span className="text-pink-400 font-bold underline underline-offset-8">You</span>...
              </h1>
              <div 
                className="cursor-pointer group relative bg-black/40 backdrop-blur-xl border border-pink-500/30 rounded-[2.5rem] p-12 transition-all hover:border-pink-500 shadow-2xl" 
                onClick={() => setCardOpen(true)}
              >
                 <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4 fill-current group-hover:scale-110 transition-transform duration-500" />
                 <p className="text-xl text-pink-200 font-medium">Click to Read</p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bg-black/60 backdrop-blur-3xl border border-pink-500/30 rounded-[2.5rem] p-8 shadow-2xl relative">
                <div ref={messageRef} className="h-[400px] overflow-y-auto text-left pr-4 text-pink-50 text-lg leading-relaxed whitespace-pre-line italic font-light custom-scrollbar">
                  {displayedText}
                  {!typingComplete && <span className="inline-block w-1.5 h-6 bg-pink-400 animate-pulse ml-1"></span>}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {typingComplete && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12">
            {!showReply ? (
              <div className="space-y-8">
                <h2 className="text-2xl text-pink-200 font-medium italic">Will you be my partner forever? ❤️</h2>
                <motion.button
                  onClick={handleYesForever}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-pink-600 to-rose-700 text-white px-12 py-4 rounded-full font-bold text-xl shadow-lg"
                >
                  Yes, Hamesha! ❤️
                </motion.button>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg mx-auto">
                <div className="relative bg-black/40 rounded-3xl border border-pink-500/30 p-4">
                  <textarea
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={sent ? "Dil tak pahonch gaya message! ❤️" : "Apne dil ki baat likho...Ji "}
                    disabled={sent || isSending}
                    className="w-full bg-transparent p-4 text-white focus:outline-none placeholder-pink-300/30 resize-none custom-scrollbar"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={sendToTelegram}
                      disabled={isSending || sent || !replyText.trim()}
                      className="bg-pink-500 hover:bg-pink-600 p-4 rounded-full text-white transition-all disabled:opacity-30 shadow-lg"
                    >
                      {isSending ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={20} />}
                    </button>
                  </div>
                </div>
                {sent && <p className="text-pink-400 mt-4 italic font-medium">💌 Your letter is on its way..........</p>}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
