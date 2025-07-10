const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log("⚠️  MongoDB not connected for contact form submission");
      return res.status(200).json({ 
        message: "Message received successfully (Database not available).",
        warning: "Database connection not available. Message not persisted."
      });
    }

    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: "Message stored in DB." });
  } catch (err) {
    console.error("❌ Error saving contact:", err);
    // Return success even on database error for better UX
    res.status(200).json({ 
      message: "Message received successfully.",
      warning: "Database operation failed. Message may not be persisted."
    });
  }
});

router.get("/", async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log("⚠️  MongoDB not connected for contact fetch");
      return res.status(200).json([]);
    }

    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    console.error("❌ Error fetching contacts:", err);
    // Return empty array on error
    res.status(200).json([]);
  }
});

module.exports = router;
