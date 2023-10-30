const express = require('express')
const User = require('../models/Users')
const Auth = require('../middleware/auth')
//signup
const router = new express.Router()
router.post('/users/login',async (req,res) => {
    const user = new User(req.body) 
    try {
        await user.save() 
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch(errpr){
        res.status(400).send(error)
    }
})
router.post('/users/logout', Auth, async (req, res) => {
    try {
        req.user.tokens =  req.user.tokens.filter((token) => {
       return token.token !== req.token
      })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
    })
router.post('/users/logoutall',Auth,async(req,res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(error){
        res.status(500).send()
    }
})

module.exports = router
