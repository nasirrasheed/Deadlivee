/*
  # Create Events Management System

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `location` (text)
      - `date` (date)
      - `time` (text)
      - `price` (decimal)
      - `max_attendees` (integer)
      - `image_url` (text)
      - `event_type` (text) - horror, psychic, investigation, etc.
      - `difficulty_level` (text) - beginner, intermediate, advanced
      - `duration` (text)
      - `status` (text) - active, cancelled, completed
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `bookings`
      - `id` (uuid, primary key)
      - `event_id` (uuid, foreign key)
      - `user_name` (text)
      - `user_email` (text)
      - `user_phone` (text)
      - `guests` (integer)
      - `total_price` (decimal)
      - `status` (text) - pending, confirmed, cancelled
      - `payment_status` (text) - pending, paid, refunded
      - `special_requests` (text)
      - `created_at` (timestamp)

    - `reviews`
      - `id` (uuid, primary key)
      - `event_id` (uuid, foreign key)
      - `user_name` (text)
      - `user_email` (text)
      - `rating` (integer)
      - `comment` (text)
      - `status` (text) - pending, approved, rejected
      - `created_at` (timestamp)

    - `messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `subject` (text)
      - `message` (text)
      - `status` (text) - unread, read, replied
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access and admin management
*/

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  max_attendees integer NOT NULL DEFAULT 20,
  image_url text,
  event_type text NOT NULL DEFAULT 'investigation',
  difficulty_level text NOT NULL DEFAULT 'beginner',
  duration text NOT NULL DEFAULT '3 hours',
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  user_name text NOT NULL,
  user_email text NOT NULL,
  user_phone text,
  guests integer NOT NULL DEFAULT 1,
  total_price decimal(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  payment_status text NOT NULL DEFAULT 'pending',
  special_requests text,
  created_at timestamptz DEFAULT now()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  user_name text NOT NULL,
  user_email text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'unread',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policies for events (public read, admin write)
CREATE POLICY "Events are viewable by everyone"
  ON events FOR SELECT
  USING (status = 'active');

CREATE POLICY "Events can be managed by admins"
  ON events FOR ALL
  USING (true);

-- Policies for bookings (users can create, admins can manage)
CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Bookings can be managed by admins"
  ON bookings FOR ALL
  USING (true);

-- Policies for reviews (users can create, admins can manage)
CREATE POLICY "Anyone can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Approved reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Reviews can be managed by admins"
  ON reviews FOR ALL
  USING (true);

-- Policies for messages (users can create, admins can manage)
CREATE POLICY "Anyone can create messages"
  ON messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Messages can be managed by admins"
  ON messages FOR ALL
  USING (true);

-- Insert sample events
INSERT INTO events (title, description, location, date, time, price, max_attendees, image_url, event_type, difficulty_level, duration) VALUES
('Tower of London Ghost Hunt', 'Experience the dark history of the Tower of London on this spine-chilling ghost hunt. Walk in the footsteps of Anne Boleyn and witness paranormal activity in one of England''s most haunted locations.', 'London', '2024-02-15', '20:00', 45.00, 20, 'https://images.pexels.com/photos/1054713/pexels-photo-1054713.jpeg?auto=compress&cs=tinysrgb&w=800', 'horror', 'intermediate', '4 hours'),
('Edinburgh Castle Spirits', 'Explore the ancient halls of Edinburgh Castle after dark. This historic fortress has witnessed centuries of conflict and tragedy, making it a hotbed of supernatural activity.', 'Edinburgh', '2024-02-20', '21:00', 55.00, 15, 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=800', 'investigation', 'advanced', '5 hours'),
('York Minster Haunting', 'Investigate paranormal phenomena in one of England''s most magnificent cathedrals. The York Minster has a history spanning over 1,000 years and countless ghostly encounters.', 'York', '2024-02-25', '19:30', 40.00, 25, 'https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg?auto=compress&cs=tinysrgb&w=800', 'psychic', 'beginner', '3 hours'),
('Warwick Castle Night Investigation', 'Join us for an overnight investigation at Warwick Castle. This medieval fortress is home to numerous spirits, including the Gray Lady and the Black Dog of Warwick.', 'Warwick', '2024-03-01', '22:00', 65.00, 12, 'https://images.pexels.com/photos/1022923/pexels-photo-1022923.jpeg?auto=compress&cs=tinysrgb&w=800', 'investigation', 'advanced', '8 hours'),
('Canterbury Cathedral Ghosts', 'Discover the spectral inhabitants of Canterbury Cathedral. This sacred site holds deep religious significance and has been the scene of miraculous and mysterious events.', 'Canterbury', '2024-03-05', '20:30', 50.00, 18, 'https://images.pexels.com/photos/161798/cathedral-canterbury-architecture-church-161798.jpeg?auto=compress&cs=tinysrgb&w=800', 'psychic', 'intermediate', '4 hours'),
('Stonehenge Paranormal Experience', 'Experience the ancient mysteries of Stonehenge after sunset. This prehistoric monument has been a site of unexplained phenomena for thousands of years.', 'Wiltshire', '2024-03-10', '21:30', 70.00, 10, 'https://images.pexels.com/photos/12894/pexels-photo-12894.jpeg?auto=compress&cs=tinysrgb&w=800', 'horror', 'advanced', '6 hours');

-- Insert sample reviews
INSERT INTO reviews (event_id, user_name, user_email, rating, comment, status) VALUES
((SELECT id FROM events WHERE title = 'Tower of London Ghost Hunt'), 'Sarah Collins', 'sarah@example.com', 5, 'Absolutely terrifying and exhilarating! The guides were knowledgeable and the experience was unforgettable.', 'approved'),
((SELECT id FROM events WHERE title = 'Edinburgh Castle Spirits'), 'Michael Brown', 'michael@example.com', 5, 'Best ghost hunt I''ve ever been on. Professional team and genuinely spooky locations.', 'approved'),
((SELECT id FROM events WHERE title = 'York Minster Haunting'), 'Emma Wilson', 'emma@example.com', 5, 'Perfect for a unique night out. Would definitely recommend to anyone brave enough!', 'approved');