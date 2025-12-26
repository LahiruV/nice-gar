const db = require('./models/Db');

const setup = `
-- USERS
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  password TEXT,
  email TEXT,
  isAdmin INTEGER DEFAULT 0
);

-- PACKAGES
CREATE TABLE IF NOT EXISTS packages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  description TEXT,
  image TEXT,
  price TEXT,
  duration TEXT,
  groupSize TEXT,
  startDate TEXT,
  isActive INTEGER DEFAULT 1
);

-- FEEDBACKS
CREATE TABLE feedbacks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT,
    serviceRating REAL,
    country TEXT
);

-- BOOKINGS
CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  packageId TEXT NOT NULL,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  travelDate TEXT NOT NULL,
  adults INTEGER NOT NULL,
  children INTEGER NOT NULL,
  mealPlan TEXT CHECK (mealPlan IN ('bb', 'hb', 'fb')) NOT NULL,
  includeTransport INTEGER NOT NULL CHECK (includeTransport IN (0, 1)),
  includeAccommodation INTEGER NOT NULL CHECK (includeAccommodation IN (0, 1)),
  specialRequests TEXT,
  increasePrice REAL NOT NULL DEFAULT 0,
  discount REAL NOT NULL DEFAULT 0,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled')) NOT NULL DEFAULT 'pending'
);

`;

db.exec(setup, (err) => {
  if (err) console.error("Setup error:", err.message);
  else console.log("Database tables created successfully");
});