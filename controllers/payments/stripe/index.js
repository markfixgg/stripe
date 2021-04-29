const stripe = require('stripe')('sk_test_51Iihs2Ejd6iefFvJhl8bJ1KjvsEO87QmtDaci0X5wp57VRs3sTdMHWT4bF8VkqXSz1wPqDdOZmWUzRLe5F5eT8Xx006DOogXol');
const { YOUR_DOMAIN } = config;

const createOrder = async (req, res) => {
    // console.log(req.body)
    // try {
    //     var items = JSON.parse(req.body.items);   
    // } catch (error) {
    //     return res.send({success: false, err: "Invalid items list!"})
    // }
    const {items} = req.body;
    if(items.length == 0) return res.send({success: false, err: "Empty items list!"})

    const line_items = [];

    await items.map(async item => {
        const {price, quantity, name, images, currency} = item;
        if(!price || !quantity || !name || !images || !currency) return;
        
        const line = {
            price_data: {
              currency: currency,
              product_data: {
                name: name,
                images: [images],
              },
              unit_amount: price,
            },
            quantity: quantity,
          }

        line_items.push(line)
    })

    if(line_items.length == 0) return res.send({success: false, err: "Empty line_items!"})

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: line_items,
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success`,
        cancel_url: `${YOUR_DOMAIN}/cancel`,
      });

      res.json({ id: session.id });
}

const calculateOrderAmount = async items => {
  var total = 0;
  for(item of items){
    const price = await stripe.prices.retrieve(item.id);
    total += price.unit_amount;
  }

  return total;
};

const create_payment_intent = async (req, res) => {

  const {items} = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: await calculateOrderAmount(items),
    currency: "usd"
  })

  res.send({
    clientSecret: paymentIntent.client_secret
  });
}

module.exports = {createOrder, create_payment_intent};