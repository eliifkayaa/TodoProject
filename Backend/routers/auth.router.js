const express = require("express");//api isteği için 
const router = express.Router();//expresin içinde ki router interfacei kullanılır.
const { v4: uuidv4 } = require("uuid") //otomatik id atar
const User = require("../models/user")
const token = require("../services/token.service")

//Register İşlemi
router.post("/register", async (req, res) => {
    const newUser = new User(req.body);
    newUser._id = uuidv4();

    try {
        const result = await newUser.save();
        //registerdan sonra bizi anasayfaya yönlendirsin bunun için bir token üretelim bu tokenla bizi yönlendirsin.
        const payload = {}// payload da karşı tarafa gönderilen değerler tutulur
        res.json({ token: token(payload), user: result })
    } catch (error) {
        if(error.code =="11000") {
            res.status(400).json({ message: "Bu kullanıcı adı daha önce alınmış"})
        }else {
            res.status(400).json({ message: error.message})
        }
    }
});

//Login işlemi
router.post("/login", async (req,res) => {
    try {
      const { userName, password } = req.body; //değerleri aldık
      var result = await User.findOne({ userName: userName, password: password});
      if (result != null) {
        const payload = {}
        res.json({ token: token(payload), user: result }) //user obje
      }else {
        res.status(400).json({ message: "Kullanıcı adı ya da şifre yanlış!"})
      }
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})

module.exports = router;