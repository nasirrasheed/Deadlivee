import { motion } from 'framer-motion'

export const FloatingGhost = () => {
  return (
    <motion.div
      className="fixed top-20 right-10 z-50 pointer-events-none opacity-30"
      animate={{
        y: [0, -20, 0],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg width="60" height="80" viewBox="0 0 60 80" fill="none" className="text-white">
        <path
          d="M30 10C20 10 15 20 15 30C15 40 20 50 20 60C20 70 25 75 30 75C35 75 40 70 40 60C40 50 45 40 45 30C45 20 40 10 30 10Z"
          fill="currentColor"
        />
        <circle cx="22" cy="28" r="3" fill="black" />
        <circle cx="38" cy="28" r="3" fill="black" />
        <path
          d="M25 38C25 38 27.5 40 30 40C32.5 40 35 38 35 38"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Floating effect */}
        <motion.path
          d="M15 75L10 80L15 85L20 80L25 85L30 80L35 85L40 80L45 85L50 80L45 75"
          fill="currentColor"
          animate={{
            d: [
              "M15 75L10 80L15 85L20 80L25 85L30 80L35 85L40 80L45 85L50 80L45 75",
              "M15 77L10 82L15 87L20 82L25 87L30 82L35 87L40 82L45 87L50 82L45 77",
              "M15 75L10 80L15 85L20 80L25 85L30 80L35 85L40 80L45 85L50 80L45 75"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
    </motion.div>
  )
}