const {readFileSync, writeFileSync, appendFile, promises: fsPromises} = require('fs');
const os = require('os');
var http = require('http');

const express = require('express')
const app = express()
const { auth } = require('express-openid-connect');


var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 5000

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin",'*') 
  next()
 })

const session = require('express-session')
app.use(session({
  secret: 'JN5iLfHJ3Zzze1LB8eTDXSomyvzivzGBE6PAXMXPHfGLcWaFPsfr9D7yuWZcoGT7',
  name: 'gYAseySuNbKfNyPWySZA02FSthdZCpyB',
  resave: true,
  saveUninitialized: true
}));


app.use(express.static('www'));


const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:5000/',
  clientID: 'gYAseySuNbKfNyPWySZA02FSthdZCpyB',
  issuerBaseURL: 'https://dev-sqarahhvhxa0rob7.us.auth0.com',
  secret: 'JN5iLfHJ3Zzze1LB8eTDXSomyvzivzGBE6PAXMXPHfGLcWaFPsfr9D7yuWZcoGT7'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
});


/*app.get('/authorize', (req, res, next) => {
  passport.authenticate('oidc', { acr_values: 'urn:grn:authn:fi:all' })(req, res, next);
});*/


app.get('/port', (req, res) => {
  res.send(`SCORE APP working on ${os.hostname} port ${port}`)
})
app.listen(port, () => {
  console.log(`Score app listening on port ${port}`)
})




