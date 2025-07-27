import { useState } from 'react'
import { motion } from 'framer-motion'
import { Ghost, Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Ghost className="text-white group-hover:text-red-500 transition-colors" size={32} />
            </motion.div>
            <span className="text-white text-xl font-bold">SpiritHunts UK</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-white hover:text-red-500 transition-colors relative ${
                  location.pathname === item.path ? 'text-red-500' : ''
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-500"
                    layoutId="activeTab"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            className="md:hidden mt-4 pb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block text-white hover:text-red-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}