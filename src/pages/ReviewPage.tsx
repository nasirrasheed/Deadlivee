import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, User, Mail, MessageSquare, ArrowLeft } from 'lucide-react'
import { Event } from '../types'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export const ReviewPage = () => {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  
  const [reviewData, setReviewData] = useState({
    user_name: '',
    user_email: '',
    comment: ''
  })

  useEffect(() => {
    if (eventId) {
      fetchEventDetails()
    }
  }, [eventId])

  const fetchEventDetails = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setReviewData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!event || rating === 0) {
      toast.error('Please provide a rating')
      return
    }

    try {
      setSubmitting(true)
      
      const { error } = await supabase
        .from('reviews')
        .insert([{
          event_id: event.id,
          ...reviewData,
          rating,
          status: 'pending'
        }])

      if (error) throw error

      toast.success('Review submitted successfully! It will be published after approval.')
      navigate('/events')
      
    } catch (error) {
      console.error('Error creating review:', error)
      toast.error('Failed to submit review. Please try again.')
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

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.button
          onClick={() => navigate('/events')}
          className="flex items-center space-x-2 text-gray-300 hover:text-white mb-8 transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ArrowLeft size={20} />
          <span>Back to Events</span>
        </motion.button>

        <div className="max-w-2xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold mb-4 font-serif">Leave a Review</h1>
            <p className="text-gray-400 text-lg">Share your experience with {event.title}</p>
          </motion.div>

          <motion.div
            className="bg-gray-900 p-8 rounded-lg border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-4">
                  How was your experience? *
                </label>
                <div className="flex justify-center space-x-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-colors"
                    >
                      <Star
                        size={32}
                        className={`${
                          star <= (hoverRating || rating)
                            ? 'text-yellow-500 fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-center text-sm text-gray-400">
                  {rating === 0 && 'Click to rate'}
                  {rating === 1 && 'Poor'}
                  {rating === 2 && 'Fair'}
                  {rating === 3 && 'Good'}
                  {rating === 4 && 'Very Good'}
                  {rating === 5 && 'Excellent'}
                </p>
              </div>

              <div>
                <label htmlFor="user_name" className="block text-sm font-medium mb-2">
                  Your Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    value={reviewData.user_name}
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
                    value={reviewData.user_email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                    placeholder="your.email@example.com"
                  />
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Your email will not be displayed publicly
                </p>
              </div>

              <div>
                <label htmlFor="comment" className="block text-sm font-medium mb-2">
                  Your Review *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-gray-400" size={20} />
                  <textarea
                    id="comment"
                    name="comment"
                    value={reviewData.comment}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white resize-none"
                    placeholder="Tell us about your experience..."
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={submitting || rating === 0}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: submitting ? 1 : 1.02 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </motion.button>

              <p className="text-sm text-gray-400 text-center">
                Your review will be reviewed by our team before being published
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}