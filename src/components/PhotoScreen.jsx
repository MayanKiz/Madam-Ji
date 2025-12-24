"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, ArrowRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules" // Added Autoplay
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import Image from "next/image"

export default function PhotoScreen({ onNext }) {
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowButton(true)
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    const photos = [
        { id: 1, src: "/images/file_0000000033d47209a53a135ce75025dd.png" },
        { id: 2, src: "/images/file_00000000887c7209b097b2331dc485ca.png" },
        { id: 3, src: "/images/file_0000000042507209b6f99aa516559b45.png" },
        { id: 4, src: "/images/file_00000000c0dc72098e7d57090b9f5d4d.png" },
        { id: 5, src: "/images/file_00000000ca9872099c9ccb55f8904764.png" },
    ]

    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center px-4 py-6 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            {/* Header section */}
            <motion.div
                className="text-center max-w-3xl mx-auto mb-10"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
            >
                <h1 className="text-2xl md:text-3xl text-pink-200 leading-relaxed mb-4 font-semibold px-2">
                    From the first day I met you, life became <span className="text-pink-400 font-bold">brighter...</span>
                </h1>
                <motion.p
                    className="text-xl md:text-2xl text-purple-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    You've made every moment so special 💕
                </motion.p>
            </motion.div>

            {/* Photo carousel - Infinite Loop Configured */}
            <motion.div
                className="w-full max-w-4xl mx-auto flex items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
            >
                <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    loop={true} // Enable Infinite Loop
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                        slideShadows: false,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="photo-swiper !pb-12"
                >
                    {photos.map((photo) => (
                        <SwiperSlide key={photo.id} style={{ width: "280px", height: "400px" }}>
                            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(236,72,153,0.3)] border border-white/10">
                                <Image
                                    fill
                                    src={photo.src}
                                    alt="Our memory"
                                    className="object-cover"
                                    sizes="280px"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>

            {/* Continue button */}
            <motion.div
                className="text-center mt-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: showButton ? 1 : 0, y: showButton ? 0 : 50 }}
                transition={{ duration: 0.8 }}
            >
                <motion.p
                    className="text-pink-300/80 text-sm mb-6 italic"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Now for the most important part...
                </motion.p>

                <button
                    onClick={onNext}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-[0_10px_20px_rgba(236,72,153,0.4)] flex items-center justify-center mx-auto"
                >
                    <Heart className="w-5 h-5 mr-2 fill-current" />
                    See the Message
                    <ArrowRight className="w-5 h-5 ml-2" />
                </button>
            </motion.div>
        </motion.div>
    )
}
