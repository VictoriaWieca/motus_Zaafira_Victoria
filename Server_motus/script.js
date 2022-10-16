
const {readFileSync, writeFileSync, promises: fsPromises} = require('fs');
const os = require('os');
const express = require('express')
const app = express()


const port = process.env.PORT || 3000
const words = readFileSync('data/liste_francais_utf8.txt', 'utf-8').toString().split('\r\n')
var current_number = 127;
var date = new Date();



var user = "Mike O'Serviss";
var password = "azerty";

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin",'*') 
  next()
 })

 app.use(express.static('www'));
app.get('/isWin', (req, res) => {
  isWin = req.myWin;
  console.log(isWin);
  res.send(isWin);
})

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
app.listen(port, () => {
  console.log(`Motus app listening on port ${port}`)
})

