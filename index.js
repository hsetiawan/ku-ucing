const express = require('express');
const app = express();



//middelware
app.use(function(req, res, next) { 
    console.log(req.method, req.path); 
    next();
});

app.get('/', function (req, res) {    
    res.send("<h1>Demo page Get</h1>");
});
app.post('/', function (req, res) {    
    res.send("<h1>Demo page Post</h1>");
});
app.put('/', function (req, res) {    
    res.send("<h1>Demo page Put</h1>");
});
app.delete('/', function (req, res) {    
    res.send("<h1>Demo page Delete</h1>");
});
 
// listen on port
app.listen(3000, () => console.log('Server Running at http://localhost:3000'));