const express = require('express');
const { createOrder, verifyPayment, getPaymentDetails } = require('../controller/Payment.Controller');
const router = express.Router();

// Create Razorpay Order
router.post('/create-order', createOrder);

// Verify Payment
router.post('/verify', verifyPayment);

// Get Payment Details
router.get('/:paymentId', getPaymentDetails);

module.exports = router;
