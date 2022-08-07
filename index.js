require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');

// Initialization
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
const app = express();

// Middlewares
app.use(express.json());
app.use(express.static('public'));

const storeItems = new Map([
  [1, { priceInCents: 3000, name: "Laptop"}],
  [2, { priceInCents: 1000, name: "shoes"}]
]);
// Routes
app.get('/', (req, res) => {

});

app.post('/pay', async(req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode:'payment',
      line_items: (req.body.items || []).map(item => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: storeItem.name
            },
            unit_amount: storeItem.priceInCents
          },
          quantity: item.quantity
        };
      }),
      success_url: `${process.env.SERVER_API}/success`,
      cancel_url: `${process.env.SERVER_API}/cancel`
    });
    res.json({url: session.url});
  } catch (e) {
    res.status(500).json({error : e.message});
  } finally {

  }

});

app.get('/success', (res, res) => {
  res.send('Paid')
});

app.get('/cancel', (req,res) => {
  res.status(400).json({
    success: false,
    message: "Payment cancelled"
  });
});

//Server
app.listen((process.env.SERVER_PORT || 5000), () => console.log(`Stripe payment API running on port ${(process.env.SERVER_PORT || 5000)}`))
