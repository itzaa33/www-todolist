var express = require('express')
var cors = require('cors')
 
const app = express();
 
app.use(cors());
 
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/eiei', (req, res) => {
  res.send({da});
});
 
app.listen(8080, () =>
  console.log(`Example app listening on port 8080!`),
);