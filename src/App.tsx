import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { WhatsAppButton } from './components/ui/WhatsAppButton'
import { HomePage } from './pages/HomePage'
import { EventsPage } from './pages/EventsPage'
import { BookingPage } from './pages/BookingPage'
import { ReviewPage } from './pages/ReviewPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { AdminPage } from './pages/AdminPage'

function App() {
  return (
    <Router>
      <div className="bg-black text-white min-h-screen">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/book/:eventId" element={<BookingPage />} />
            <Route path="/review/:eventId" element={<ReviewPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1f2937',
              color: '#fff',
              border: '1px solid #374151'
            }
          }}
        />
      </div>
    </Router>
  )
}

export default App