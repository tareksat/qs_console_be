require('dotenv').config();
require('express-async-errors')
const express = require('express');
const morgan = require('morgan');
const path = require('path')
const app = express();


app.use(express.json());
app.use(morgan('tiny'));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// serve your css as static
app.use(express.static(path.join(__dirname + '/public')));

app.get('/',function(req,res){
    console.log(path.join(__dirname+'/public'+'/index.html'))
  res.sendFile(path.join(__dirname+'/public'+'/index.html'));
});

process.on("uncaughtException", (e)=>{
    console.log("uncaughtException", e.message)
});

process.on("unhandledRejection", (e) => {
    console.log("unhandledRejection", e)
})

require('./routes')(app);
app.use((error, req, res, next) => {
    if(error) res.send({status: 500})
})


const port = process.env.PORT;

try{
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}catch(e){
    console.log(e.message)
}
