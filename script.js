/*const http = require('http');
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});*/
const {readFileSync, writeFileSync, promises: fsPromises} = require('fs');
const os = require('os');
const express = require('express')
const app = express()
//const port = 3000
const port = process.env.PORT || 3000
const words = readFileSync('data/liste_francais_utf8.txt', 'utf-8').toString().split('\r\n')
var current_number = 127;
var date = new Date();
app.use(express.static('public'));
//app.use((req,res,next)=>{
  // console.log(req.path)
  // next()
 //})
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/word', (req, res) => {
  var current_day = date.getDate()
  if(current_day != readFileSync('actuel.txt', 'utf-8').split('\n')[1]){
    current_number = Math.floor(Math.random()*words.length);
    writeFileSync('actuel.txt', `${current_number}\n${current_day}`, 'utf-8');
  }
  res.send(words[current_number])
})
app.get('/port', (req, res) => {
  res.send(`MOTUS APP working on ${os.hostname} port ${port}`)
})
app.listen(port, () => {
  console.log(`Motus app listening on port ${port}`)
})

