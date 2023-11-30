const express = require('express');
const Item = require('../models/Item') 
const Cart = require('../models/Cart')
const Auth = require('../middleware/auth');
const Order = require('../models/Order');
const router = new express.Router() 

router.get('/orders', Auth, async (req, res) => {
    const owner = req.user._id;
    try {
    const order = await Order.find({ owner: owner }).sort({ date: -1 });
    res.status(200).send(order)
    } catch (error) {
    res.status(500).send()
    }
    })
router.post('/order/checkout',async(req,res) => {
   console.log(req.body) 
   const newOrder = new Order({
        ...req.body
   }) 
   await newOrder.save()
   res.status(200).send(newOrder)
})
module.exports = router