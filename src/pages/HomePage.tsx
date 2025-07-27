import { motion } from 'framer-motion'
import { ArrowRight, Ghost, MapPin, Users, Calendar, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FloatingGhost } from '../components/ui/FloatingGhost'

export const HomePage = () => {
  const featuredEvents = [
    {
      id: '1',
      title: 'Tower of London Ghost Hunt',
      date: '2024-02-15',
      location: 'London',
      price: 45,
      image: 'https://images.pexels.com/photos/1054713/pexels-photo-1054713.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      title: 'Edinburgh Castle Spirits',
      date: '2024-02-20',
      location: 'Edinburgh',
      price: 55,
      image: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      title: 'York Minster Haunting',
      date: '2024-02-25',
      location: 'York',
      price: 40,
      image: 'https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Collins',
      text: 'Absolutely terrifying and exhilarating! The guides were knowledgeable and the experience was unforgettable.',
      rating: 5
    },
    {
      name: 'Michael Brown',
      text: 'Best ghost hunt I\'ve ever been on. Professional team and genuinely spooky locations.',
      rating: 5
    },
    {
      name: 'Emma Wilson',
      text: 'Perfect for a unique night out. Would definitely recommend to anyone brave enough!',
      rating: 5
    }
  ]

  return (
    <div className="bg-black text-white">
      <FloatingGhost />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center filter grayscale"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1054713/pexels-photo-1054713.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        />
        <div className="absolute inset-0 bg-black/70" />
        
        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 font-serif"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Enter the World of
            <span className="block text-red-500">Supernatural</span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Join the UK's most authentic ghost hunting experiences in the most haunted locations
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Link to="/events">
              <motion.button
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center space-x-2 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Book Your Experience</span>
                <ArrowRight size={20} />
              </motion.button>
            </Link>
            
            <Link to="/about">
              <motion.button
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating particles effect */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </section>

      {/* Featured Events */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 font-serif">Featured Events</h2>
            <p className="text-gray-400 text-lg">Experience the most haunted locations in the UK</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg group cursor-pointer border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 filter grayscale"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded">
                    £{event.price}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="flex items-center space-x-4 text-gray-400 text-sm mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <Link to={`/events/${event.id}`}>
                    <motion.button
                      className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book Now
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 font-serif">Why Choose SpiritHunts UK</h2>
            <p className="text-gray-400 text-lg">The most authentic paranormal experiences in Britain</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Ghost,
                title: '150+ Haunted Locations',
                description: 'Access to the most paranormally active sites across the UK'
              },
              {
                icon: Users,
                title: 'Expert Guides',
                description: 'Professional paranormal investigators with years of experience'
              },
              {
                icon: MapPin,
                title: 'Authentic Experiences',
                description: 'Real historical locations with documented supernatural activity'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="mb-4 flex justify-center"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="text-red-500" size={48} />
                </motion.div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 font-serif">What Our Brave Souls Say</h2>
            <p className="text-gray-400 text-lg">Real experiences from real ghost hunters</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-900 p-6 rounded-lg border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-500 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <p className="text-white font-semibold">- {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}