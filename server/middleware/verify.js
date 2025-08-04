const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        res.status(401).json({message : "You are not log in"})
    }
    jwt.verify(token, "SECRET_KEY", (err, user) => {

        if(err)
            res.status(401).json({message : "Token time is out of existing"})

        req.user = user
    })
}