// require('rootpath')();
const express = require('express')
const app = express()
const port = 8081
app.use(express.static('dist'));

app.get('/*', (req, res) => {
  // console.log('in f5');
  res.sendFile(__dirname  + '../dist/index.html', err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
