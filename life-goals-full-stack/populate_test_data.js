const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const goals = require("./models/goals");

// the dotenv package allows us to read environment variables from a .env file
const dotenv = require("dotenv");
dotenv.config();

// Connect to the MongoDB database
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

// Create some dummy users and life goals
async function seed() {

  // Create some dummy life goals for user1
  const goal1 = await goals.create({
    goal: "Learn a new language",
    due_date: new Date("2023-12-31"),
    is_completed: false
  });

  const goal2 = await goals.create({
    goal: "Travel to Japan",
    due_date: new Date("2025-12-31"),
    is_completed: false
  });

  // Create some dummy life goals for user2
  const goal3 = await goals.create({
    goal: "Save money for a down payment on a house",
    due_date: new Date("2027-12-31"),
    is_completed: false
  });

  const goal4 = await goals.create({
    goal: "Run a marathon",
    due_date: new Date("2024-12-31"),
    is_completed: false
  });

  console.log("Dummy data seeded successfully!");
  process.exit();
}

// Call the seed function to populate the database with dummy data
seed();
