const express = require('express');
const router = express.Router();

const {
    createCheckout,
    successPayment,
    cancelPayment,
    getEmailKeys,

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

router.get('/get-email-keys', async (req, res) => {
    try {
        const keys = await getEmailKeys();
        res.status(200).json(keys);
    } catch (error) {
        res.status(500).json({ error: 'Payment Error ' });
    }
});

// Ruta para agregar una factura a los pedidos de un usuario y una tienda
router.post('/add-invoice', async (req, res) => {
    const { userIdentifier, storeId, invoice } = req.body;

    try {
        await addInvoiceToOrders(userIdentifier, storeId, invoice);
        res.status(201).json({ message: 'Invoice added to user and store orders.' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding the invoice to orders.' });
    }
});

router.get('/successPayment', successPayment);

module.exports = router;
