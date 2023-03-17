const jwt = require("jsonwebtoken")

const secretKey = "My secret key My secret key My secret key 123 My secret key";

const options = {
    expiresIn: "1d" //1 gün
}

const token = (payload) =>{
    // payload da karşı tarafa gönderilen değerler tutulur
    return jwt.sign(payload, secretKey, options)
}

module.exports = token;