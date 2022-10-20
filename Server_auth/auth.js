const {readFileSync, writeFileSync, appendFile, promises: fsPromises} = require('fs');
const os = require('os');
var http = require('http');

const express = require('express')
const app = express()


var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 5000

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin",'*') 
  next()
 })




app.use(express.static('www'));


app.get('/', (req, res) => {
});

app.get('/login', (req, res) => res.oidc.login({ returnTo: '/authorize' }));


app.get('/authorize', (req, res) => {
  res.redirect("login.html");
});


app.get('/port', (req, res) => {
  res.send(`SCORE APP working on ${os.hostname} port ${port}`)
})
app.listen(port, () => {
  console.log(`Score app listening on port ${port}`)
})




