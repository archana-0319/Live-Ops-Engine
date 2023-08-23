const express = require('express');
const router = express.Router();
const SECRET_CODE = "adhijaksdhkdiwdnkaldakshd";
const {offer} = require('../Schema/offerShema')
const jwt = require("jsonwebtoken");
const { user } = require('../Schema/userSchema');

const getUserByToken = (token) => {
    return new Promise((resolve, reject) => {
        if(token) {
            let userData
            try{
                userData = jwt.verify(token, SECRET_CODE);
                resolve(userData);
            }catch(err){ 
                reject("Invalid Token")
            }
        } else{
            reject("Token not found")
        }
    })
}

router.post("/list", async(req, resp) => {
    const validOffers = [];
    offer.find().then((offers) => {
        // console.log(offers, "offer list")
        offers.filter((offer) => {
            const rules = offer.target.split("and")
            // console.log(rules)
            rules.forEach((rule) => {
                let ruleKey = {};
                if(rule.includes(">")) {
                    ruleKey = {key: rule.trim.split(">")[0].trim(), value: parseInt(rule.trim.split(">")[1]),}
                    if(req.body[ruleKey.key] > ruleKey.value) {
                        validOffers.push(offer);
                    }
                } else {
                    ruleKey = {key : rule.trim.split("<")[0], value: rule.trim.split("<")[1],}
                    if(req.body[ruleKey.key] < ruleKey.value) {
                        validOffers.push(offer);
                    }
                }
            })
            resp.status(200).send(validOffers);
        })
    }).catch(() => {
        resp.status(500).send("Internal Server Error..")
    });
});

router.post("/create", async(req, resp) => {
    getUserByToken(req.headers.authorization).then((user)=>{
        //creating a offer
        offer.create({...req.body, username: user.username}).then((offer) => {
            resp.status(200).send(offer)
        }).catch((err) =>{
            resp.status(400).send({message: err.message}) 
        })

    }).catch((err)=>{
        resp.status(400).send(err)
    })
})

router.put("/update",(req, resp) => {
    resp.status(200).send("updated Successfully..")
});

router.delete("/delete", (req, resp) => {
    offer.deleteOne({_id:req.body.id})
})

module.exports = router;