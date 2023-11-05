const jwt = require('jsonwebtoken');
const User = require('../models/Users')
const auth = async(req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer','')
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findOne({_id: decoded._id,'tokens.token': token},{expiresIn: '1h'})
        if(!user){
            throw new Error
        }
        req.token = token 
        token.user = user 
        next()
    } catch(error){
        res.status(401).send({error: "Authenticaiton required"})
    }
}
module.exports = auth