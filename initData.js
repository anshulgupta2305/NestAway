require("dotenv").config();

const mongoose = require("mongoose");
const Listing = require("./models/listing");

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/nestaway";

const sampleListings = [
  {
    title: "Modern City Apartment",
    description:
      "A bright, comfortable apartment close to cafés, shopping and public transport.",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=85",
    price: 2500,
    location: "Bhopal",
    country: "India"
  },
  {
    title: "Lakeview Weekend Home",
    description:
      "A peaceful stay with a warm interior and relaxing views, perfect for a weekend escape.",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=85",
    price: 3600,
    location: "Udaipur",
    country: "India"
  },
  {
    title: "Minimal Studio",
    description:
      "A compact modern studio designed for comfortable city living and short stays.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85",
    price: 1800,
    location: "Indore",
    country: "India"
  },
  {
    title: "Heritage Courtyard Stay",
    description:
      "A character-filled stay inspired by Jaipur's architecture, with a calm private courtyard.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    price: 4200,
    location: "Jaipur",
    country: "India"
  },
  {
    title: "Coastal Hideaway",
    description:
      "A laid-back coastal home for slow mornings, relaxed evenings and memorable holidays.",
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=85",
    price: 5000,
    location: "Goa",
    country: "India"
  },
  {
    title: "Urban Loft",
    description:
      "A stylish loft with an airy living space, ideal for exploring the city and working remotely.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    price: 3900,
    location: "Delhi",
    country: "India"
  },
  {
    title: "Quiet Garden Home",
    description:
      "A peaceful home surrounded by greenery with a cozy atmosphere for longer stays.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
    price: 2900,
    location: "Bhopal",
    country: "India"
  },
  {
    title: "Sunlit Boutique Stay",
    description:
      "A warm, sunlit space with clean interiors and thoughtful details for a comfortable trip.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
    price: 3300,
    location: "Udaipur",
    country: "India"
  }
];

async function initData() {
  try {
    await mongoose.connect(MONGO_URI);
    await Listing.deleteMany({});
    await Listing.insertMany(sampleListings);
    console.log(`✓ Inserted ${sampleListings.length} sample listings.`);
  } catch (error) {
    console.error("Failed to seed data:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

initData();
