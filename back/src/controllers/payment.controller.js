
const Stripe = require('stripe');
const {User} = require('../models/user');
const {Store} = require('../models/store');
require('dotenv').config();

const { STRIPE_SECRET, EMAILJS_PUBLIC_KEY, EMAILJS_TEMPLATE_ID, EMAILJS_SERVICE_ID, FRONT_URL_DEPLOY } = process.env;
const stripe = new Stripe(STRIPE_SECRET);

const createCheckout = async (cartDetails) => {
    try {
        const itemsCart = [];
        cartDetails.items.map((item) => {
            itemsCart.push(
                {
                    price_data: {
                        product_data: {
                            name: item.name,
                            description: item.name
                        },
                        currency: 'usd',
                        unit_amount: item.price * 100,
                    },
                    quantity: parseInt(item.quantity),
                }
            )
        })

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            success_url: `${FRONT_URL_DEPLOY}?/home?success=true`,
            cancel_url: `${FRONT_URL_DEPLOY}?/home?cancel=true`,
            line_items: itemsCart
        })

        return session;

    } catch (err) {
        console.log(err);
    }
};


const getEmailKeys = async () => {
    return {EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY}        
}

const successPayment = async () => {
        
}

const cancelPayment = async () => { }

const addInvoiceToOrders = async (userIdentifier, storeId, invoice) => {
    try {
        const user = await User.findOne({ userIdentifier });
        const store = await Store.findById(storeId);

        user.orders.push(invoice);
        await user.save();

        store.orders.push(invoice);
        await store.save();

        console.log("Factura agregada a los pedidos del usuario y la tienda con éxito.");
    } catch (error) {
        console.log("Error al agregar la factura a los pedidos:", error);
    }
};


module.exports = {
    createCheckout,
    successPayment,
    cancelPayment,
    getEmailKeys,
    addInvoiceToOrders

}