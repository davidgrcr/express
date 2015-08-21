var express = require('express');
var router = express.Router();

var Order = require('../models/order.model');

function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()) return next();
  return res.redirect('user/login');
}

/* GET orders listing. */
router.get('/',ensureAuthenticated, function(req, res, next) {
  res.render('order',{user: req.user});
});

router.get('/:order',ensureAuthenticated, function(req, res, next) {
    Order.findOne({_id:req.params.order, customer: req.user._id})
    .populate('customer')
    .exec(function(err, order){
        if (err) {
          throw err;
        } 
        if(order) {
          res.render('ordered',{order:order});
        } else {
          res.redirect('/');
        }
    });
});

/* POST orders listing. */

router.post('/submit',ensureAuthenticated, function(req, res) {
    var form = req.body, user = req.user;

    form.customer = user;

    if(form.customer && form.pizza){
      Order.create(form, function(err, created){
        if(err) throw err;
         //res.json(created);
        //res.render('ordered',{order:created});
        res.redirect('/order/'+ created._id);
      });
    }else {
      res.redirect('order');
    }

});


module.exports = router;
