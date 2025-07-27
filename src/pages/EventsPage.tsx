import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Calendar, MapPin, Clock, Users } from 'lucide-react'
import { EventCard } from '../components/events/EventCard'
import { Event } from '../types'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [eventTypeFilter, setEventTypeFilter] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('')
  const [sortBy, setSortBy] = useState('date')

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'active')
        .order('date', { ascending: true })

      if (error) throw error
      setEvents(data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
      toast.error('Failed to load events')
    } finally {
      setLoading(false)
    }
  }

  const eventTypes = [
    { value: 'horror', label: 'Horror Experience' },
    { value: 'psychic', label: 'Psychic Investigation' },
    { value: 'investigation', label: 'Paranormal Investigation' },
    { value: 'séance', label: 'Séance Session' },
    { value: 'overnight', label: 'Overnight Investigation' }
  ]

  const difficultyLevels = [
    { value: 'beginner', label: 'Beginner Friendly' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced Only' }
  ]

  const filteredEvents = events
    .filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(event => 
      locationFilter === '' || event.location.toLowerCase().includes(locationFilter.toLowerCase())
    )
    .filter(event => 
      eventTypeFilter === '' || event.event_type === eventTypeFilter
    )
    .filter(event => 
      difficultyFilter === '' || event.difficulty_level === difficultyFilter
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      } else if (sortBy === 'price') {
        return a.price - b.price
      }
      return 0
    })

  const locations = Array.from(new Set(events.map(event => event.location)))

  const handleEventClick = (eventId: string) => {
    window.location.href = `/book/${eventId}`
  }

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading haunted experiences...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-4 font-serif">Ghost Hunt Events</h1>
          <p className="text-gray-400 text-lg">Discover the most haunted locations across the UK</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="bg-gray-900 p-6 rounded-lg mb-8 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Location Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
              <select
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white appearance-none"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Event Type Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
              <select
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white appearance-none"
                value={eventTypeFilter}
                onChange={(e) => setEventTypeFilter(e.target.value)}
              >
                <option value="">All Types</option>
                {eventTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="relative">
              <Users className="absolute left-3 top-3 text-gray-400" size={20} />
              <select
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white appearance-none"
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
              >
                <option value="">All Levels</option>
                {difficultyLevels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
              <select
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white appearance-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Sort by Date</option>
                <option value="price">Sort by Price</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-center">
            <span className="text-gray-400">
              {filteredEvents.length} haunted experience{filteredEvents.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <EventCard 
                event={event} 
                onClick={() => handleEventClick(event.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-gray-400 text-lg mb-4">No events match your criteria</div>
            <button
              onClick={() => {
                setSearchTerm('')
                setLocationFilter('')
                setEventTypeFilter('')
                setDifficultyFilter('')
                setSortBy('date')
              }}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}