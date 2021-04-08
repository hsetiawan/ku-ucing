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


//middelware
// app.use(function(req, res, next) { 
//     console.log(req.method, req.path); 
//     next();
// });

// app.get('/', function (req, res) {    
//     res.send("<h1>Demo page Get</h1>");
// });
// app.post('/', function (req, res) {    
//     res.send("<h1>Demo page Post</h1>");
// });
// app.put('/', function (req, res) {    
//     res.send("<h1>Demo page Put</h1>");
// });
// app.delete('/', function (req, res) {    
//     res.send("<h1>Demo page Delete</h1>");
// });

app.use(express.json());
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

// listen on port
app.listen(3010, () => console.log('Server Running at http://localhost:3010'));