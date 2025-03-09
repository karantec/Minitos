const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    businessName: { type: String, required: true },
    businessType: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },
    nominateForAwards: { type: Boolean, default: false },
    acceptMessages: { type: Boolean, default: false }
  }, { timestamps: true });

// Middleware to update the updatedAt field before saving
FormSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Form', FormSchema);