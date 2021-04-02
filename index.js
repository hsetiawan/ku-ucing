const express = require('express');
const app = express();
const cats = require('./controllers/cat');
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

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});
  
  
    return;
  });

// listen on port
app.listen(3010, () => console.log('Server Running at http://localhost:3010'));