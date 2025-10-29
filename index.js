const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config();
var jwt = require('jsonwebtoken');

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


app.post('jwt', async(req,res)=>{
    const user = req.body;
    const token = jwt.sign(user, process.env.SECREAT_KEY ,{expiresIn:"1h"});
    res.send(token)
})

app.get('/',(req,res)=>{
    res.send('Bdcalling is running')
});

app.listen(port ,()=>{
    console.log(`bdcalling is running on Port:${port}`)
})