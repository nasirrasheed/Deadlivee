import { motion } from 'framer-motion'
import { Ghost, Award, Users, MapPin, Clock, Shield } from 'lucide-react'

export const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Dr. Margaret Blackwood',
      role: 'Lead Paranormal Investigator',
      bio: 'With over 20 years of experience investigating supernatural phenomena, Dr. Blackwood has documented over 500 paranormal encounters across the UK.',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Thomas Sterling',
      role: 'Historical Research Specialist',
      bio: 'A historian with expertise in medieval and Victorian-era Britain, Thomas provides authentic historical context to our ghost hunting experiences.',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Sarah Chen',
      role: 'Technical Equipment Manager',
      bio: 'Sarah ensures our investigations use the latest paranormal detection equipment, from EMF detectors to thermal imaging cameras.',
      image: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]

  const stats = [
    { icon: Ghost, value: '500+', label: 'Investigations Conducted' },
    { icon: Users, value: '10,000+', label: 'Brave Participants' },
    { icon: MapPin, value: '150+', label: 'Haunted Locations' },
    { icon: Clock, value: '8', label: 'Years of Experience' }
  ]

  const certifications = [
    'Licensed Paranormal Investigation Team',
    'Historic England Partnership',
    'British Society for Psychical Research Member',
    'Fully Insured Professional Guides'
  ]

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center filter grayscale opacity-20"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1054713/pexels-photo-1054713.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="container mx-auto relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif">
              About <span className="text-red-500">SpiritHunts UK</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              The UK's premier paranormal investigation company, dedicated to providing authentic, 
              spine-chilling experiences in Britain's most haunted locations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 font-serif">Our Story</h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>
                  Founded in 2016 by Dr. Margaret Blackwood, SpiritHunts UK emerged from a passion 
                  for uncovering the mysteries that lie beyond the veil of our everyday world. 
                  What started as academic research into paranormal phenomena has evolved into 
                  the UK's most trusted ghost hunting experience company.
                </p>
                <p>
                  Our team combines rigorous scientific methodology with respect for the historical 
                  significance of Britain's most haunted locations. We believe that every spirit 
                  has a story to tell, and every location holds secrets waiting to be discovered.
                </p>
                <p>
                  Over the years, we've built partnerships with historic sites across the UK, 
                  gaining exclusive after-hours access to locations that have witnessed centuries 
                  of human drama, tragedy, and triumph.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.pexels.com/photos/1054713/pexels-photo-1054713.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Historic castle at night"
                className="w-full h-96 object-cover rounded-lg filter grayscale"
              />
              <div className="absolute inset-0 bg-black/30 rounded-lg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 font-serif">Our Achievements</h2>
            <p className="text-gray-400 text-lg">Years of dedicated paranormal investigation</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="flex justify-center mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="text-red-500" size={48} />
                </motion.div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 font-serif">Meet Our Team</h2>
            <p className="text-gray-400 text-lg">Professional paranormal investigators and historians</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-gray-900 rounded-lg overflow-hidden border border-white/10 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 filter grayscale"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-red-500 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 font-serif">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                To provide authentic, educational, and thrilling paranormal experiences that 
                respect both the living and the spirits we encounter, while preserving the 
                historical integrity of Britain's most haunted locations.
              </p>
              
              <h3 className="text-2xl font-bold mb-4">Core Values</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start space-x-3">
                  <Shield className="text-red-500 mt-1 flex-shrink-0" size={20} />
                  <span><strong className="text-white">Respect:</strong> For spirits, history, and participants</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Award className="text-red-500 mt-1 flex-shrink-0" size={20} />
                  <span><strong className="text-white">Authenticity:</strong> Genuine experiences without manufactured scares</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Users className="text-red-500 mt-1 flex-shrink-0" size={20} />
                  <span><strong className="text-white">Education:</strong> Learning about history and paranormal phenomena</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 font-serif">Certifications</h2>
              <div className="bg-gray-800 p-6 rounded-lg border border-white/10">
                <ul className="space-y-4">
                  {certifications.map((cert, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <span className="text-gray-300">{cert}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 p-6 bg-red-900/20 border border-red-500/30 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-red-400">Safety First</h3>
                <p className="text-gray-300">
                  All our investigations are conducted with the highest safety standards. 
                  We provide comprehensive safety briefings, emergency procedures, and 
                  maintain full insurance coverage for all participants.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}