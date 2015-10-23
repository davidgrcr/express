var express = require('express');
var router = express.Router();

var Order = require('../models/order.model');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport();
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'david.gras85@gmail.com',
        pass: 'developer!'
    }
});

var mailOptions = {
    from: 'PIZZA PLANET ✔ davidgrcr@gmail.com', // sender address
    to: '', // list of receivers
    subject: 'Su pedido esta listo ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};

router.get('/', function (req, res) {
    Order.find({})
        .populate('customer')
        .exec(function (err, orders) {
            if (err) throw err;
            res.render('admin', {orders: orders});
        });

});

router.get('/order/:order/:state', function (req, res) {
    Order.update({_id: req.params.order}, {"$set": {state: req.params.state}})
        .exec(function (err, updated) {
            if (err) throw err;

            if (req.params.state == "ready") {
                Order.findOne({_id: req.params.order})
                    .populate('customer')
                    .exec(function (err, order) {
                        if (err) throw err;
                        if (order.email_on_ready) {
                            // Mandamos el mail
                            mailOptions.to = order.customer.email;
                            transporter.sendMail(mailOptions, function (err, info) {
                                //if (err) throw err;
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("Info email: ", info);
                                }
                            });
                        } else {
                            console.log("El usuario no tiene notificacion por email");
                        }
                    });
            }
            res.redirect('/admin');
        });
});

module.exports = router;
