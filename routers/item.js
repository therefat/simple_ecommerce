const express = require('express');
const Item = require('../models/Item') 
const Auth = require('../middleware/auth')
const upload = require('../middleware/uploadMiddleware')
const router = new express.Router() 

router.post('/items',Auth,upload.single('image'), async(req,res) => {
    if(req.file){
        console.log(req.file.filename)
    }
    // let imagess = req.file ? req.file.filename : null
    const image = req.file.filename;
    const url = req.protocol + '://' + req.get('host')
    console.log(req.body)
   
    console.log(req.user._id)
    try{
        const newItem = new Item({
            
            owner : req.user._id,
            ...req.body,
            image: url + '/public/uploads/productImage/' + req.file.filename


        })
        
        await newItem.save()
        res.status(201).send(newItem)
    } catch(error){
        console.log(error)
        res.status(400).send({})
    }
})
router.get('/items/:id',async(req,res) => {
    try{
        const item = await Item.findOne({_id: req.params.id})
        if(!item){
            res.status(404).send({error: "Item not found"})
        }
        res.status(200).send(item)
    }catch(error){
        res.status(400).send(error)
    }
})

router.get('/items',async(req,res) => {
    try{
        const items = await Item.find({})
        res.status(200).send(items)
    }catch(error){
        res.status(400).send(error)
    }
})
router.patch('/items/:id',Auth,async(req,res) => {
    const updates = Object.keys(req.body)
    const allowdUpdates = ['name','description','category','price']
    const isValidOperation = updates.every((update) =>              allowedUpdates.includes(update))
   if(!isValidOperation) {
     return res.status(400).send({ error: 'invalid updates'})
}
try{
    const item = await Item.findOne({_id: req.params.id})
    if(!item){
        return res.status(404).send()
    }
    updates.forEach((update) => item[update] = req.body[update])
    await item.save()
    res.send(item)
} catch(error){
    res.status(400).send(error)
}

})
router.delete('/items/:id', Auth, async(req, res) => {
    try {
    const deletedItem = await Item.findOneAndDelete( {_id: req.params.id} )
       if(!deletedItem) {
        res.status(404).send({error: "Item not found"})
    }
       res.send(deletedItem)
    } catch (error) {
       res.status(400).send(error)
    }
    }) 

module.exports = router