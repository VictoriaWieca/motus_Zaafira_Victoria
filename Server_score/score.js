const {readFileSync, writeFileSync, promises: fsPromises} = require('fs');
const os = require('os');

const express = require('express')
const app = express()


const port = process.env.PORT || 3001


app.use(express.static('www'));


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/score', (req, res) => {
  res.send("test");
})
app.get('/port', (req, res) => {
  res.send(`SCORE APP working on ${os.hostname} port ${port}`)
})
app.listen(port, () => {
  console.log(`Score app listening on port ${port}`)
})


