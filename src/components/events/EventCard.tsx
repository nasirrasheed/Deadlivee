import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Clock, Star, Zap } from 'lucide-react'
import { Event } from '../../types'
import { format } from 'date-fns'

interface EventCardProps {
  event: Event
  onClick: () => void
}

const getEventTypeIcon = (type: string) => {
  switch (type) {
    case 'horror':
      return '👻'
    case 'psychic':
      return '🔮'
    case 'investigation':
      return '🔍'
    case 'séance':
      return '🕯️'
    case 'overnight':
      return '🌙'
    default:
      return '👻'
  }
}

const getDifficultyColor = (level: string) => {
  switch (level) {
    case 'beginner':
      return 'bg-green-600'
    case 'intermediate':
      return 'bg-yellow-600'
    case 'advanced':
      return 'bg-red-600'
    default:
      return 'bg-gray-600'
  }
}
export const EventCard = ({ event, onClick }: EventCardProps) => {
  return (
    <motion.div
      className="bg-gray-900 rounded-lg overflow-hidden shadow-lg cursor-pointer border border-white/10 group"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image_url || 'https://images.pexels.com/photos/2310641/pexels-photo-2310641.jpeg?auto=compress&cs=tinysrgb&w=800'}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 filter grayscale"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          £{event.price}
        </div>
        
        {/* Event Type Badge */}
        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
          <span>{getEventTypeIcon(event.event_type)}</span>
          <span className="capitalize">{event.event_type}</span>
        </div>
        
        {/* Difficulty Badge */}
        <div className={`absolute bottom-4 left-4 ${getDifficultyColor(event.difficulty_level)} text-white px-2 py-1 rounded text-xs font-semibold uppercase`}>
          {event.difficulty_level}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
          {event.title}
        </h3>
        
        <p className="text-gray-400 mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <Calendar size={16} />
            <span>{format(new Date(event.date), 'PPP')}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock size={16} />
            <span>{event.time} • {event.duration}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <MapPin size={16} />
            <span>{event.location}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Users size={16} />
            <span>Max {event.max_attendees} attendees</span>
          </div>
        </div>

        <motion.button
          className="w-full mt-4 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Book Now
        </motion.button>
      </div>
    </motion.div>
  )
}