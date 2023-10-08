const express = require('express');
const router = express.Router();

const {
    createCheckout,
    successPayment,
    cancelPayment,

} = require('../controllers/payment.controller');

router.post('/create-checkout', async (req, res) => {
    try {
        const session = await createCheckout(req.body);
        //res.redirect(303, session.url);
        res.status(200).json(session);
    } catch (error) {
        res.status(500).json({ error: 'Payment Error ' });
    }
});

router.get('/successPayment', successPayment);

module.exports = router;
