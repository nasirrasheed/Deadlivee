import { useState } from 'react'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Calendar, 
  Users, 
  Settings, 
  Plus, 
  Edit, 
  Trash2,
  Eye,
  MessageSquare,
  Star,
  Check,
  X,
  TrendingUp,
  Clock
} from 'lucide-react'
import { Event, Booking, Review, Message } from '../types'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

export const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  
  // Real-time data states
  const [events, setEvents] = useState<Event[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    upcomingEvents: 0,
    pendingReviews: 0
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData()
      setupRealtimeSubscriptions()
    }
  }, [isAuthenticated])

  const fetchAllData = async () => {
    setLoading(true)
    try {
      await Promise.all([
        fetchEvents(),
        fetchBookings(),
        fetchReviews(),
        fetchMessages()
      ])
      calculateStats()
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to load admin data')
    } finally {
      setLoading(false)
    }
  }

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true })
    
    if (error) throw error
    setEvents(data || [])
  }

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, events(title)')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    setBookings(data || [])
  }

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*, events(title)')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    setReviews(data || [])
  }

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    setMessages(data || [])
  }

  const calculateStats = () => {
    const totalBookings = bookings.length
    const totalRevenue = bookings
      .filter(b => b.payment_status === 'paid')
      .reduce((sum, b) => sum + b.total_price, 0)
    const upcomingEvents = events.filter(e => 
      e.status === 'active' && new Date(e.date) > new Date()
    ).length
    const pendingReviews = reviews.filter(r => r.status === 'pending').length

    setStats({
      totalBookings,
      totalRevenue,
      upcomingEvents,
      pendingReviews
    })
  }

  const setupRealtimeSubscriptions = () => {
    // Subscribe to real-time changes
    const bookingsSubscription = supabase
      .channel('bookings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => {
        fetchBookings()
      })
      .subscribe()

    const reviewsSubscription = supabase
      .channel('reviews')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reviews' }, () => {
        fetchReviews()
      })
      .subscribe()

    const messagesSubscription = supabase
      .channel('messages')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, () => {
        fetchMessages()
      })
      .subscribe()

    return () => {
      bookingsSubscription.unsubscribe()
      reviewsSubscription.unsubscribe()
      messagesSubscription.unsubscribe()
    }
  }

  const handleReviewAction = async (reviewId: string, action: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ status: action })
        .eq('id', reviewId)

      if (error) throw error
      toast.success(`Review ${action} successfully`)
      fetchReviews()
    } catch (error) {
      console.error('Error updating review:', error)
      toast.error('Failed to update review')
    }
  }

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return

    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId)

      if (error) throw error
      toast.success('Review deleted successfully')
      fetchReviews()
    } catch (error) {
      console.error('Error deleting review:', error)
      toast.error('Failed to delete review')
    }
  }

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event? This will also delete all associated bookings and reviews.')) return

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId)

      if (error) throw error
      toast.success('Event deleted successfully')
      fetchEvents()
    } catch (error) {
      console.error('Error deleting event:', error)
      toast.error('Failed to delete event')
    }
  }

  const markMessageAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ status: 'read' })
        .eq('id', messageId)

      if (error) throw error
      fetchMessages()
    } catch (error) {
      console.error('Error updating message:', error)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple demo authentication
    if (loginData.email === 'admin@spirithunts.co.uk' && loginData.password === 'admin123') {
      setIsAuthenticated(true)
    } else {
      alert('Invalid credentials. Use admin@spirithunts.co.uk / admin123')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <motion.div
          className="bg-gray-900 p-8 rounded-lg border border-white/10 w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl font-bold mb-6 text-center font-serif">Admin Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                placeholder="admin@spirithunts.co.uk"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                placeholder="admin123"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              Login
            </button>
          </form>
          
          <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-white/10">
            <p className="text-sm text-gray-400 text-center">
              Demo Credentials:<br />
              Email: admin@spirithunts.co.uk<br />
              Password: admin123
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'events', name: 'Events', icon: Calendar },
    { id: 'bookings', name: 'Bookings', icon: Users },
    { id: 'reviews', name: 'Reviews', icon: Star },
    { id: 'messages', name: 'Messages', icon: MessageSquare },
    { id: 'settings', name: 'Settings', icon: Settings },
  ]

  const renderDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-white/10">
          <h3 className="text-lg font-semibold mb-2">Total Bookings</h3>
          <p className="text-3xl font-bold text-red-500">{stats.totalBookings}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-white/10">
          <h3 className="text-lg font-semibold mb-2">Revenue</h3>
          <p className="text-3xl font-bold text-green-500">£{stats.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-white/10">
          <h3 className="text-lg font-semibold mb-2">Upcoming Events</h3>
          <p className="text-3xl font-bold text-blue-500">{stats.upcomingEvents}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-white/10">
          <h3 className="text-lg font-semibold mb-2">Pending Reviews</h3>
          <p className="text-3xl font-bold text-purple-500">{stats.pendingReviews}</p>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg border border-white/10">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {bookings.slice(0, 5).map((booking) => (
            <div key={booking.id} className="flex justify-between items-center py-2 border-b border-gray-700">
              <span>New booking: {booking.user_name} for {booking.events?.title}</span>
              <span className="text-gray-400 text-sm">{format(new Date(booking.created_at), 'MMM dd, HH:mm')}</span>
            </div>
          ))}
          {reviews.filter(r => r.status === 'pending').slice(0, 3).map((review) => (
            <div key={review.id} className="flex justify-between items-center py-2 border-b border-gray-700">
              <span>New review pending approval from {review.user_name}</span>
              <span className="text-gray-400 text-sm">{format(new Date(review.created_at), 'MMM dd, HH:mm')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Event Management</h2>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
          <Plus size={20} />
          <span>Add Event</span>
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="text-left p-4">Event</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Bookings</th>
              <th className="text-left p-4">Type</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => {
              const eventBookings = bookings.filter(b => b.event_id === event.id).length
              return (
              <tr key={event.id} className="border-t border-gray-700">
                <td className="p-4">{event.title}</td>
                <td className="p-4">{format(new Date(event.date), 'MMM dd, yyyy')}</td>
                <td className="p-4">{eventBookings}/{event.max_attendees}</td>
                <td className="p-4 capitalize">{event.event_type}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${
                    event.status === 'active' ? 'bg-green-600 text-white' : 
                    event.status === 'cancelled' ? 'bg-red-600 text-white' : 
                    'bg-gray-600 text-white'
                  }`}>
                    {event.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button className="text-blue-400 hover:text-blue-300">
                      <Eye size={18} />
                    </button>
                    <button className="text-yellow-400 hover:text-yellow-300">
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteEvent(event.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderBookings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Booking Management</h2>

      <div className="bg-gray-800 rounded-lg border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="text-left p-4">Event</th>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Guests</th>
              <th className="text-left p-4">Total</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t border-gray-700">
                <td className="p-4">{booking.events?.title}</td>
                <td className="p-4">{booking.user_name}</td>
                <td className="p-4">{booking.user_email}</td>
                <td className="p-4">{booking.guests}</td>
                <td className="p-4">£{booking.total_price}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${
                    booking.status === 'confirmed' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-yellow-600 text-white'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button className="text-blue-400 hover:text-blue-300">
                      <Eye size={18} />
                    </button>
                    <button className="text-yellow-400 hover:text-yellow-300">
                      <Edit size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderReviews = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Review Management</h2>

      <div className="bg-gray-800 rounded-lg border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="text-left p-4">Event</th>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Rating</th>
              <th className="text-left p-4">Comment</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id} className="border-t border-gray-700">
                <td className="p-4">{review.events?.title}</td>
                <td className="p-4">{review.user_name}</td>
                <td className="p-4">
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-500 fill-current" size={16} />
                    ))}
                  </div>
                </td>
                <td className="p-4 max-w-xs truncate">{review.comment}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${
                    review.status === 'approved' ? 'bg-green-600 text-white' :
                    review.status === 'rejected' ? 'bg-red-600 text-white' :
                    'bg-yellow-600 text-white'
                  }`}>
                    {review.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    {review.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleReviewAction(review.id, 'approved')}
                          className="text-green-400 hover:text-green-300"
                          title="Approve"
                        >
                          <Check size={18} />
                        </button>
                        <button 
                          onClick={() => handleReviewAction(review.id, 'rejected')}
                          className="text-red-400 hover:text-red-300"
                          title="Reject"
                        >
                          <X size={18} />
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-red-400 hover:text-red-300"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderMessages = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Message Management</h2>

      <div className="grid gap-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`bg-gray-800 p-6 rounded-lg border ${
              message.status === 'unread' ? 'border-red-500/50' : 'border-white/10'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{message.subject}</h3>
                <p className="text-gray-400">From: {message.name} ({message.email})</p>
                {message.phone && (
                  <p className="text-gray-400">Phone: {message.phone}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-sm ${
                  message.status === 'unread' ? 'bg-red-600 text-white' :
                  message.status === 'read' ? 'bg-blue-600 text-white' :
                  'bg-green-600 text-white'
                }`}>
                  {message.status}
                </span>
                <span className="text-gray-400 text-sm">
                  {format(new Date(message.created_at), 'MMM dd, yyyy HH:mm')}
                </span>
              </div>
            </div>
            
            <p className="text-gray-300 mb-4">{message.message}</p>
            
            {message.status === 'unread' && (
              <button
                onClick={() => markMessageAsRead(message.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Mark as Read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
        </div>
      )
    }

    switch (activeTab) {
      case 'dashboard':
        return renderDashboard()
      case 'events':
        return renderEvents()
      case 'bookings':
        return renderBookings()
      case 'reviews':
        return renderReviews()
      case 'messages':
        return renderMessages()
      case 'settings':
        return <div className="text-center py-12 text-gray-400">Settings panel coming soon...</div>
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 min-h-screen border-r border-white/10">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-8 font-serif">Admin Panel</h1>
            
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-red-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <tab.icon size={20} />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="absolute bottom-6 left-6">
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  )
}