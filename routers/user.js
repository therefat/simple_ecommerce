const express = require('express')
const User = require('../models/Users')
const Auth = require('../middleware/auth')
//signup
const router = new express.Router()
//signup
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
        console.log("accoutn created")
    } catch (error) {
        res.status(400).send() 
        

    }

})
router.post('/users/login', async (req, res) => {
    console.log(req.body.email)
    console.log(req.body.password)
    console.log(req.get('Cookie'))
    try {

        const user = await User.findByCredentials(req.body.email, req.body.password)
        if(!user){
            // throw new Error('User dose not match') 
            
        }
        const token = await user.generateAuthToken()
        
        // res.send({ user, token})
        res.json({token: token})
        console.log('login')
        
    } catch (Error) {
        
        res.status(400).send(Error)
        
        
    }
})
router.post('/users/logout', Auth, async (req, res) => {
    console.log(req.user,"hh")
    try {
        req.user.tokens =  req.user.tokens.filter((token) => {
       return token.token !== req.token
      })
        await req.user.save()
        res.send("logout succeful")
        console.log('logout succeful')
    } catch (Error) {
        res.status(500).send(Error)
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
