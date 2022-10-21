const {readFileSync, writeFileSync, appendFile, promises: fsPromises} = require('fs');
const os = require('os');
var http = require('http');
var jwt = require('jsonwebtoken')

const express = require('express')
const app = express()


var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 5000

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Content-Type, Authorization");
  next()
  })

app.use(express.static('www'));

var user = "MikeOServiss";
var password = "azerty";

app.get('/authorize', (req, res) => {
  const redirect_uri = req.query.redirect_uri;
  console.log(redirect_uri);
  res.redirect(redirect_uri);
});

app.post('/authorize', (req, res) =>{
  console.log(req.body.myLogin);
  if(req.body.myLogin == user && req.body.myPass == password){
    var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
    res.redirect('http://localhost:3000/callback?token='+token+'&login='+req.body.myLogin);
  }
  else{
    res.redirect('/login.html#invalid');
    console.log('Invalid username or password');
  }
})
var logged = 0;
app.post('/logged', (req, res) => {
  logged=parseInt(req.body.connected);
  console.log(logged);
})

app.get('/logged', (req, res) => {
  console.log(`dans le get ${logged}`)
  res.send(`${logged}`);
})

app.get('/port', (req, res) => {
  res.send(`AUTH APP working on ${os.hostname} port ${port}`)
})
app.listen(port, () => {
  console.log(`Auth app listening on port ${port}`)
})




