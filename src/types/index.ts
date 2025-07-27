export interface Event {
  id: string
  title: string
  description: string
  location: string
  date: string
  time: string
  price: number
  max_attendees: number
  image_url: string
  event_type: 'horror' | 'psychic' | 'investigation' | 'séance' | 'overnight'
  difficulty_level: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  status: 'active' | 'cancelled' | 'completed'
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  event_id: string
  user_name: string
  user_email: string
  user_phone: string
  guests: number
  total_price: number
  status: 'pending' | 'confirmed' | 'cancelled'
  payment_status: 'pending' | 'paid' | 'refunded'
  special_requests?: string
  created_at: string
}

export interface Review {
  id: string
  event_id: string
  user_name: string
  user_email: string
  rating: number
  comment: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

export interface Message {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: 'unread' | 'read' | 'replied'
  created_at: string
}