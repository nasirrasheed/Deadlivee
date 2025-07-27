import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react'
import { useState } from 'react'

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitMessage()
  }

  const submitMessage = async () => {
    try {
      const { error } = await supabase
        .from('messages')
        .insert([formData])

      if (error) throw error

      toast.success('Thank you for your message! We\'ll get back to you within 24 hours.')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (error) {
      console.error('Error submitting message:', error)
      toast.error('Failed to send message. Please try again.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER
  const whatsappMessage = "Hello! I'd like to know more about your ghost hunt events."

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      {/* Header */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif">
              Contact <span className="text-red-500">Us</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to embark on a paranormal adventure? Get in touch with our team of expert ghost hunters.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div>
                <h2 className="text-3xl font-bold mb-6 font-serif">Get In Touch</h2>
                <p className="text-gray-300 text-lg mb-8">
                  Have questions about our ghost hunts? Want to book a private investigation? 
                  Or perhaps you have a haunted location you'd like us to investigate? 
                  We'd love to hear from you!
                </p>
              </div>

              <div className="space-y-6">
                <motion.div
                  className="flex items-start space-x-4 p-4 bg-gray-900 rounded-lg border border-white/10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail className="text-red-500 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-2">Email Us</h3>
                    <p className="text-gray-400">info@spirithunts.co.uk</p>
                    <p className="text-gray-400">bookings@spirithunts.co.uk</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4 p-4 bg-gray-900 rounded-lg border border-white/10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Phone className="text-red-500 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-2">Call Us</h3>
                    <p className="text-gray-400">+44 7123 456789</p>
                    <p className="text-sm text-gray-500">Mon-Fri: 9AM-6PM GMT</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4 p-4 bg-gray-900 rounded-lg border border-white/10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin className="text-red-500 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-2">Visit Us</h3>
                    <p className="text-gray-400">
                      SpiritHunts UK Headquarters<br />
                      123 Paranormal Lane<br />
                      London, UK SW1A 1AA
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4 p-4 bg-gray-900 rounded-lg border border-white/10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Clock className="text-red-500 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-2">Business Hours</h3>
                    <div className="text-gray-400 space-y-1">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                      <p className="text-sm text-gray-500">Events run in the evenings</p>
                    </div>
                  </div>
                </motion.div>

                {/* WhatsApp Quick Contact */}
                <motion.div
                  className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <MessageCircle className="text-green-500" size={24} />
                    <h3 className="font-semibold text-green-400">Quick WhatsApp Contact</h3>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Get instant answers to your questions via WhatsApp!
                  </p>
                  <a
                    href={`https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                  >
                    <MessageCircle size={20} />
                    <span>Chat Now</span>
                  </a>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="bg-gray-900 p-8 rounded-lg border border-white/10"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-6 font-serif">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                    placeholder="+44 7123 456789"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Event Booking</option>
                    <option value="private">Private Investigation</option>
                    <option value="general">General Inquiry</option>
                    <option value="media">Media/Press</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white resize-none"
                    placeholder="Tell us about your inquiry, preferred dates, number of guests, or any specific requirements..."
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm text-gray-400 text-center">
                  We typically respond within 24 hours. For urgent inquiries, please call us directly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 font-serif">Frequently Asked Questions</h2>
            <p className="text-gray-400 text-lg">Quick answers to common questions</p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "How long do the ghost hunts last?",
                answer: "Most of our events run for 3-4 hours, typically starting at sunset and ending around midnight. Some special overnight investigations can last up to 8 hours."
              },
              {
                question: "What should I bring to a ghost hunt?",
                answer: "We provide all paranormal investigation equipment. You should bring warm, comfortable clothing, sturdy shoes, and a positive attitude! We recommend dressing in layers as historic buildings can be cold."
              },
              {
                question: "Are your events suitable for beginners?",
                answer: "Absolutely! Our expert guides will explain everything you need to know. No previous paranormal investigation experience is required."
              },
              {
                question: "What's your cancellation policy?",
                answer: "We offer full refunds up to 48 hours before the event. Between 24-48 hours, a 50% refund applies. Unfortunately, no refunds are available within 24 hours of the event due to venue commitments."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 rounded-lg border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold text-lg mb-3 text-red-400">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}