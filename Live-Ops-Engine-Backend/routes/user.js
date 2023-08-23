const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const {user} = require('../Schema/userSchema')
const jwt = require("jsonwebtoken");
const SECRET_CODE = "adhijaksdhkdiwdnkaldakshd";
const salt = 10;

router.post("/signup", async(req, resp)=> {
    //Create a User 
    //encrypt password 
    bcrypt.genSalt(salt, (saltErr, saltValue)=> {
        if(saltErr){
            resp.status(401).send('Unable to process..')
        } else {
            bcrypt.hash(req.body.password, saltValue, (hashErr, hashValue) => {
                if(hashErr){
                    resp.status(401).send('Unable to process..')
                } else {
                    user.create({username: req.body.username, password: hashValue, email: req.body.email || ""}).then((user)=> {
                        resp.status(200).send(user);
                    }).catch((err)=> {
                        resp.status(400).send(err.message)
                    })
                }
            })
        }
    })
});

// Sign part is done refer 
// completed till  35: mints 

router.post("/signin", async(req, resp)=> {
    // validate the User 
    user.findOne({username: req.body.username}).then((user) => {
        if(!user){
            resp.status(401).send("User not exits");
        } else {
            if(!bcrypt.compareSync(req.body.password, user.password)){
                resp.status(401).send("Invalid password");
            } else {
                const token = jwt.sign({id: user._id, username: user.username}, SECRET_CODE);
                resp.status(200).send({message: " User loggedin Successfully..", token : token });
                // resp.status(200).send({message : " User loggedin Successfully.. "});
            }
        }
    }).catch((err)=>{
        resp.status(401).send({message: "Something went wrong", err})
    })

});

module.exports = router;