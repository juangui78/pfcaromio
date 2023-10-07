
const Stripe = require('stripe');
require('dotenv').config();

const { STRIPE_SECRET } = process.env;
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
            success_url: 'http://localhost:5173/home',
            cancel_url: 'http://localhost:5173/home',
            line_items: itemsCart
        })
        return session;

    } catch (err) {
        console.log(err);
    }
};


const successPayment = async (paymentDetails) => { 

}

const cancelPayment = async () => { }

module.exports = {
    createCheckout,
    successPayment,
    cancelPayment,

}