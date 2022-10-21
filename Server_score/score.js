const {readFileSync, writeFileSync, appendFile, promises: fsPromises} = require('fs');
const os = require('os');
var http = require('http');
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const port = process.env.PORT || 3001
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin",'*') 
  next()
 })
app.use(express.static('www'));
app.get('/', (req, res) => {
  res.send('hello');
})
app.post('/score', (req, res) => {
  theWin = req.body;
  var score = readFileSync('data/score.txt', 'utf-8').toString().split('\n');
  var nbTries = readFileSync('data/nbTriesTotal.txt', 'utf-8').toString().split('\n');
  console.log(theWin);isWin=parseInt(theWin.myWin);
  var thescore = score[0];
  console.log(`scoreeee ${thescore}`);
  console.log(`isWin ${isWin}`);
  var newScore=thescore;
  var nb_tries_today = score[1];
  console.log(`nb tries today ${nb_tries_today}`);
  var new_nb_tries_today=0;
  if(isWin == 1){
    new_nb_tries_today = parseInt(nb_tries_today)+1;
    console.log(`new nb tries today ${new_nb_tries_today}`);
    if(nbTries[0]==""){
      writeFileSync('data/nbTriesTotal.txt', `${new_nb_tries_today}`, 'utf-8');
    } else {
      appendFile('data/nbTriesTotal.txt',`\n${new_nb_tries_today}`, function(err) {
        console.log("ok");
      });
    }
    newScore = parseInt(score)+1;
    writeFileSync('data/score.txt', `${newScore}\n${0}`, 'utf-8');
    res.send({new_score: newScore, nb_tries: nbTries});
  }
  else{
    console.log("faux");
    new_nb_tries_today = parseInt(nb_tries_today)+1;
    console.log(`new nb tries today ${new_nb_tries_today}`);
    writeFileSync('data/score.txt', `${thescore}\n${new_nb_tries_today}`, 'utf-8');
  }
})
app.get('/score', (req, res) => {
  var score = readFileSync('data/score.txt', 'utf-8').toString().split('\n')[0];
  var nbTries = readFileSync('data/nbTriesTotal.txt', 'utf-8').toString().split('\n');
  res.send({new_score: score, nb_tries: nbTries});
  //res.redirect("/score.html")
})
app.get('/port', (req, res) => {
  res.send(`SCORE APP working on ${os.hostname} port ${port}`)
})
app.listen(port, () => {
  console.log(`Score app listening on port ${port}`)
})