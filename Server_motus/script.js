
const {readFileSync, writeFileSync, promises: fsPromises} = require('fs');
const os = require('os');
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 3000
const words = readFileSync('data/liste_francais_utf8.txt', 'utf-8').toString().split('\r\n')
var current_number = readFileSync('actuel.txt', 'utf-8').split('\n')[0];
//console.log(`current number : ${current_number}`)
var date = new Date();

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin",'*') 
  next()
 })

var session = require('express-session')
app.use(session({
  name: 'session',
  secret: 'test',
  cookie: {
    httpOnly: true,
  },
  resave: true,
  saveUninitialized: true
}));
/*
app.use((req,res,next)=>{
  if(req.session.user){
    // token = jwt with user
    next(); //token="+token);
  }else{
    res.redirect("http://localhost:5000/login.html")
  }
});*/

// cookie parser middleware
app.use(cookieParser());

app.use(express.static('www'));


var user = "Mike O'Serviss";
var password = "azerty";

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
    res.send(req.session.user)
})

app.post('/session', (req, res) =>{
  console.log(req.body.myLogin);
  if(req.body.myLogin == user && req.body.myPass == password){
    req.session.user=req.body.myLogin;
    req.session.loggedin = true;
    console.log(req.body.myLogin);
    res.redirect('/index.html');
  }
  else{
    res.redirect('http://localhost:5000/login.html#invalid');
    console.log('Invalid username or password');
}
})
app.listen(port, () => {
  console.log(`Motus app listening on port ${port}`)
})

