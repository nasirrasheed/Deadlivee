import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export const WhatsAppButton = () => {
  const whatsappNumber = '+447123456789' // Random UK number as requested
  const message = "Hello! I'm interested in your ghost hunt events. Can you help me?"
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        boxShadow: [
          "0 0 0 0 rgba(34, 197, 94, 0.7)",
          "0 0 0 10px rgba(34, 197, 94, 0)",
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    >
      <MessageCircle size={24} />
    </motion.button>
  )
}