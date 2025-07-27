import { Ghost, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Ghost className="text-red-500" size={24} />
              <span className="text-xl font-bold">SpiritHunts UK</span>
            </div>
            <p className="text-gray-400">
              Experience the supernatural with the UK's premier ghost hunting events.
            </p>
            <div className="flex space-x-4">
              <Facebook className="hover:text-red-500 cursor-pointer transition-colors" size={20} />
              <Twitter className="hover:text-red-500 cursor-pointer transition-colors" size={20} />
              <Instagram className="hover:text-red-500 cursor-pointer transition-colors" size={20} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/events" className="block text-gray-400 hover:text-white transition-colors">
                Events
              </Link>
              <Link to="/about" className="block text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
              <Link to="/privacy" className="block text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail size={16} />
                <span>info@spirithunts.co.uk</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone size={16} />
                <span>+44 7123 456789</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin size={16} />
                <span>London, UK</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-gray-400 text-sm">
              Get notified about new haunted locations and special events.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:border-red-500"
              />
              <button className="px-4 py-2 bg-red-600 text-white rounded-r-md hover:bg-red-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 SpiritHunts UK. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}