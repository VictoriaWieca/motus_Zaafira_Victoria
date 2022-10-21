
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


//loki
/*const loki_uri = process.env.LOKI || "http://127.0.0.1:2100";


const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");
const options = {
  transports: [
    new LokiTransport({
      host: loki_uri
    })
  ]
};


*/


app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Content-Type, Authorization"); 
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
  logger.info({ message: 'URL '+req.url , labels: { 'url': req.url, 'user':username } })
  res.send(`MOTUS APP working on ${os.hostname} port ${port}`)
})

app.get('/session', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.send(req.session.user);
})

app.get('/callback', (req, res) => {
  const token = req.query.token;
  const pseudo = req.query.login;
  console.log(`token : ${token}`);
  if(token!=''){
    req.session.user=pseudo;
    req.session.loggedin = true;
    console.log(`mylogin : ${req.session.user}`);
    var redirect_uri="http://localhost:3000/index.html"
    res.redirect('http://localhost:5000/authorize?redirect_uri='+redirect_uri);
  }
  else{
    res.redirect('http://localhost:5000/login.html#invalid');
    console.log('Invalid username or password');
  }
})

app.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('http://localhost:3000/index.html');
});

app.listen(port, () => {
  console.log(`Motus app listening on port ${port}`)
})

