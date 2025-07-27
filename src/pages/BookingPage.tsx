import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  CreditCard, 
  User, 
  Mail, 
  Phone,
  MessageSquare,
  ArrowLeft,
  Star,
  Shield
} from 'lucide-react'
import { Event, Review } from '../types'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

export const BookingPage = () => {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState<Event | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  
  const [bookingData, setBookingData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    guests: 1,
    special_requests: ''
  })

  useEffect(() => {
    if (eventId) {
      fetchEventDetails()
      fetchReviews()
    }
  }, [eventId])

  const fetchEventDetails = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .eq('status', 'active')
        .single()

      if (error) throw error
      setEvent(data)
    } catch (error) {
      console.error('Error fetching event:', error)
      toast.error('Event not found')
      navigate('/events')
    } finally {
      setLoading(false)
    }
  }

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('event_id', eventId)
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(5)

      if (error) throw error
      setReviews(data || [])
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBookingData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) || 1 : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!event) return

    try {
      setSubmitting(true)
      
      const totalPrice = event.price * bookingData.guests
      
      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          event_id: event.id,
          ...bookingData,
          total_price: totalPrice,
          status: 'pending',
          payment_status: 'pending'
        }])
        .select()
        .single()

      if (error) throw error

      toast.success('Booking submitted successfully! We\'ll contact you shortly.')
      
      // In a real app, redirect to payment or confirmation page
      navigate('/events')
      
    } catch (error) {
      console.error('Error creating booking:', error)
      toast.error('Failed to submit booking. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading event details...</p>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="bg-black text-white min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <button
            onClick={() => navigate('/events')}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Back to Events
          </button>
        </div>
      </div>
    )
  }

  const totalPrice = event.price * bookingData.guests
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center filter grayscale"
          style={{
            backgroundImage: `url(${event.image_url || 'https://images.pexels.com/photos/2310641/pexels-photo-2310641.jpeg?auto=compress&cs=tinysrgb&w=1920'})`,
          }}
        />
        <div className="absolute inset-0 bg-black/70" />
        
        <div className="container mx-auto relative z-10">
          <motion.button
            onClick={() => navigate('/events')}
            className="flex items-center space-x-2 text-gray-300 hover:text-white mb-6 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ArrowLeft size={20} />
            <span>Back to Events</span>
          </motion.button>

          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">
              {event.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-lg">
              <div className="flex items-center space-x-2">
                <Calendar className="text-red-500" size={20} />
                <span>{format(new Date(event.date), 'PPP')}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="text-red-500" size={20} />
                <span>{event.time} • {event.duration}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <MapPin className="text-red-500" size={20} />
                <span>{event.location}</span>
              </div>

              {reviews.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Star className="text-yellow-500 fill-current" size={20} />
                  <span>{averageRating.toFixed(1)} ({reviews.length} reviews)</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Event Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              className="bg-gray-900 p-8 rounded-lg border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-4 font-serif">About This Experience</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {event.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <Users className="text-red-500 mx-auto mb-2" size={24} />
                  <div className="text-sm text-gray-400">Max Attendees</div>
                  <div className="font-semibold">{event.max_attendees}</div>
                </div>
                
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <Clock className="text-red-500 mx-auto mb-2" size={24} />
                  <div className="text-sm text-gray-400">Duration</div>
                  <div className="font-semibold">{event.duration}</div>
                </div>
                
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <Shield className="text-red-500 mx-auto mb-2" size={24} />
                  <div className="text-sm text-gray-400">Difficulty</div>
                  <div className="font-semibold capitalize">{event.difficulty_level}</div>
                </div>
                
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <CreditCard className="text-red-500 mx-auto mb-2" size={24} />
                  <div className="text-sm text-gray-400">Price</div>
                  <div className="font-semibold">£{event.price}</div>
                </div>
              </div>
            </motion.div>

            {/* Reviews */}
            {reviews.length > 0 && (
              <motion.div
                className="bg-gray-900 p-8 rounded-lg border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-6 font-serif">What Others Say</h2>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{review.user_name}</span>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="text-yellow-500 fill-current" size={16} />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300 italic">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-gray-900 p-8 rounded-lg border border-white/10 sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-6 font-serif">Book Your Experience</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="user_name" className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      value={bookingData.user_name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="user_email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="email"
                      id="user_email"
                      name="user_email"
                      value={bookingData.user_email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="user_phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="tel"
                      id="user_phone"
                      name="user_phone"
                      value={bookingData.user_phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                      placeholder="+44 7123 456789"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="guests" className="block text-sm font-medium mb-2">
                    Number of Guests *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="number"
                      id="guests"
                      name="guests"
                      value={bookingData.guests}
                      onChange={handleInputChange}
                      min="1"
                      max={event.max_attendees}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Maximum {event.max_attendees} attendees
                  </p>
                </div>

                <div>
                  <label htmlFor="special_requests" className="block text-sm font-medium mb-2">
                    Special Requests
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-400" size={20} />
                    <textarea
                      id="special_requests"
                      name="special_requests"
                      value={bookingData.special_requests}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white resize-none"
                      placeholder="Any special requirements or questions..."
                    />
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span>Price per person:</span>
                    <span>£{event.price}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Guests:</span>
                    <span>{bookingData.guests}</span>
                  </div>
                  <div className="border-t border-gray-600 pt-2 mt-2">
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-red-500">£{totalPrice}</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: submitting ? 1 : 1.02 }}
                  whileTap={{ scale: submitting ? 1 : 0.98 }}
                >
                  {submitting ? 'Processing...' : 'Book Now'}
                </motion.button>

                <p className="text-sm text-gray-400 text-center">
                  You'll receive a confirmation email with payment instructions
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}