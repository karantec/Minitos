const Razorpay = require('razorpay');
const crypto = require('crypto');
const dotenv = require('dotenv');
const Payment = require('../models/Payment.Model');
const Booking = require('../models/Booking.Model');

dotenv.config();

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order
exports.createOrder = async (req, res) => {
    try {
        const { bookingId, userId, amount, paymentMethod } = req.body;

        // Validate booking existence
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        // Create a new Razorpay order
        const options = {
            amount: amount * 100, // Convert to paise
            currency: "INR",
            receipt: `receipt_${bookingId}`,
            payment_capture: 1, // Auto capture payment
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Verify Payment
exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId, userId, amount, paymentMethod } = req.body;

        // Validate signature
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Invalid payment signature" });
        }

        // Save Payment in DB
        const payment = new Payment({
            booking: bookingId,
            user: userId,
            amount,
            status: 'completed',
            transactionId: razorpay_payment_id,
            paymentMethod,
        });

        await payment.save();

        res.status(200).json({ success: true, message: "Payment successful" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Payment Details
exports.getPaymentDetails = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const payment = await Payment.findById(paymentId).populate('booking user');

        if (!payment) return res.status(404).json({ message: 'Payment not found' });

        res.status(200).json({ success: true, payment });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
