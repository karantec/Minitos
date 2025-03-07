const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true }, // Link to Booking
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User making payment
    amount: { type: Number, required: true }, // Payment amount
    status: { 
        type: String, 
        enum: ['completed', 'failed'], // Only two statuses
        required: true 
    }, 
    transactionId: { type: String, unique: true }, // Unique transaction ID
    paymentMethod: { 
        type: String, 
        enum: ['card', 'upi', 'netbanking', 'wallet', 'cash'], 
        required: true 
    }, // Payment mode
    createdAt: { type: Date, default: Date.now } // Timestamp
});

module.exports = mongoose.model('Payment', PaymentSchema);
