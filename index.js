const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config();
var jwt = require('jsonwebtoken');

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


app.post('/jwt', async(req,res)=>{
    const user = req.body;
    const token = jwt.sign(user, process.env.SECREAT_KEY ,{expiresIn:"1h"});
    res.send({accessToken:token})
})

// veryToken middleware
 const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).send({message:'unauthorized'});

    const token = authHeader.split("")[1];
    jwt.verify(token,process.env.SECREAT_KEY,(error,decoded)=>{
        if(error) return res.status(403).send({message:'forbidden'});
        req.decoded = decoded;
        next()
    });
 };

app.get('/',(req,res)=>{
    res.send('Bdcalling is running')
});

app.listen(port ,()=>{
    console.log(`bdcalling is running on Port:${port}`)
})