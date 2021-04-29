const controllers = require('./controllers')

const routes = (app) => {
    // stripe routes
    app.post('/create-checkout-session', async (req, res) => await controllers.payments.stripe.createOrder(req, res))
    app.post('/create-payment-intent', async (req, res) => await controllers.payments.stripe.create_payment_intent(req, res))

    // static pages
    app.get('/checkout', async (req, res) => res.sendFile(`${__dirname}/static/checkout.html`))
    app.get('/intent', async (req, res) => res.sendFile(`${__dirname}/static/intent.html`))
    app.get('/success', async (req, res) => res.sendFile(`${__dirname}/static/success.html`))
    app.get('/cancel', async (req, res) => res.sendFile(`${__dirname}/static/cancel.html`))    

    return app
}

module.exports = routes;