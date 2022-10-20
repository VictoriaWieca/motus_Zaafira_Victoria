
const {readFileSync, writeFileSync, promises: fsPromises} = require('fs');
const os = require('os');
const express = require('express')
const app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 3000
const words = readFileSync('data/liste_francais_utf8.txt', 'utf-8').toString().split('\r\n')
var current_number = readFileSync('actuel.txt', 'utf-8').split('\n')[0];
//console.log(`current number : ${current_number}`)
var date = new Date();

var user = "Mike O'Serviss";
var password = "azerty";

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin",'*') 
  next()
 })

/*
app.use((req,res,next)=>{
  if(req.session.user){
    next()
  }else{
    res.redirect("www/login.html")
  }
}) 
*/

app.use(express.static('www'));


app.get('/word', (req, res) => {
  var current_day = date.getDate()
  if(current_day != readFileSync('actuel.txt', 'utf-8').split('\n')[1]){
    current_number = Math.floor(Math.random()*words.length);
    writeFileSync('actuel.txt', `${current_number}\n${current_day}`, 'utf-8');
  }
  word=words[current_number];
  res.send(word);
})
app.get('/port', (req, res) => {
  res.send(`MOTUS APP working on ${os.hostname} port ${port}`)
})

app.get('/session', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>Session expires : ' + req.session.cookie.expires + '</p>')
    res.send(`hello ${req.oidc.user.sub}`);
    res.end()
})
app.listen(port, () => {
  console.log(`Motus app listening on port ${port}`)
})

