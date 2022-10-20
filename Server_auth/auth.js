const {readFileSync, writeFileSync, appendFile, promises: fsPromises} = require('fs');
const os = require('os');
var http = require('http');

const express = require('express')
const app = express()

var { Issuer, Strategy } = require('openid-client');

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 5000

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin",'*') 
  next()
 })

const session = require('express-session')
const passport = require('passport');

app.set('trust proxy', 1) // trust first proxy

app.use(session({
  secret: 's3Cur3',
  name: 'sessionId',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

Issuer.discover('http://localhost:5000')
  .then(local => {
    console.log("testttttttttttt");
    var client = new local.Client({
      client_id: 'urn:criipto:nodejs:demo:1010',
      client_secret: 'j9wYVyD3zXZPMo3LTq/xSU/sMu9/shiFKpTHKfqAutM=',
      redirect_uris: [ 'http://localhost:5000/authorize' ],
      token_endpoint_auth_method: 'client_secret_post'
    });
  
  
    // do the rest of setup here
    passport.use(
      'oidc',
      new Strategy({ client }, (tokenSet, userinfo, done) => {
        return done(null, tokenSet.claims());
      })
    );
    
    passport.serializeUser(function(user, done) {
      done(null, user);
    });
    passport.deserializeUser(function(user, done) {
      done(null, user);
    });
  
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: err
      });
    });
  });



app.use(express.static('www'));



app.get('/', (req, res) => {
  res.send('hello');
})

app.get('/authorize', (req, res, next) => {
  passport.authenticate('oidc', { acr_values: 'urn:grn:authn:fi:all' })(req, res, next);
});


app.get('/port', (req, res) => {
  res.send(`SCORE APP working on ${os.hostname} port ${port}`)
})
app.listen(port, () => {
  console.log(`Score app listening on port ${port}`)
})




