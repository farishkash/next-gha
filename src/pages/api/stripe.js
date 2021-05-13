const stripe = require('stripe')(
  'sk_test_51IGVGVGjzZBtdwJuFexxOng5ynkp3zTF1bEK3reC0r806k4ocKC30tTozOlPmzObeb6ogVPfWmZuQG43hl2MjmwS00g2kgJJmO',
);

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Invalid request method!' });
  }
  const { amount } = JSON.parse(req.body);

  if (!amount) {
    return res.status(400).json({ message: 'No amount selected!' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    console.log('Worked! ', paymentIntent.id);

    return res.json({
      amount,
      intentSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log('Error! ', err.message);
    return res.status(500).json({ error: err, message: err.message });
  }
};

export default handler;
