
const jwt = require('jsonwebtoken');
const Registration = require('../Models/Schema')


const auth = async(req,res,next)=>{  // next is a Keyword

    try {

        const token = req.cookies.jwt;
        const verifyToken = jwt.verify(token , process.env.SECRET_KEY);
        console.log(verifyToken);

        const User = await Registration.findOne({_id : verifyToken._id});
        console.log(User);

        req.User = User;
        req.token = token;
        next();
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = auth;

