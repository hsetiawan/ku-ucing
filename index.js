const express = require('express');
const app = express();
const cats = require('./controllers/cat');
const diseases = require('./controllers/disease');
const symptoms = require('./controllers/symptoms');
const medication = require('./controllers/medication');

const permission = require('./controllers/permission');
const address = require('./controllers/address');
const user = require('./controllers/user');

const bodyParser = require('body-parser');



app.use(express.json());
// serve your css as static
app.use(express.static('public'));

app.use('/cat', cats);
app.use('/disease', diseases);
app.use('/symptoms', symptoms);
app.use('/medication', medication);

app.use('/permission', permission);

app.use('/address', address);
app.use('/user', user);


/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});
  
  
    return;
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// listen on port
app.listen(3010, () => console.log('Server Running at http://localhost:3010'));