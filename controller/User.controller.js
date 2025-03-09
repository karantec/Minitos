const FormData = require("../models/User.Model");

const createFormData = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, businessName, businessType, streetAddress, city, state, pinCode, nominateForAwards, acceptMessages } = req.body;

    if (!firstName || !lastName || !email || !phone || !businessName || !businessType || !streetAddress || !city || !state || !pinCode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newFormData = new FormData({
      firstName,
      lastName,
      email,
      phone,
      businessName,
      businessType,
      streetAddress,
      city,
      state,
      pinCode,
      nominateForAwards,
      acceptMessages,
    });

    await newFormData.save();

    res.status(201).json({ message: "Data saved successfully", data: newFormData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save data", error: error.message });
  }
};

const getAllFormData = async (req, res) => {
  try {
    const formData = await FormData.find();
    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch data", error: error.message });
  }
};

module.exports = { createFormData, getAllFormData };