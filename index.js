const express = require('express');
const app = express();
const nunjucks=require('nunjucks');
const bodyParser = require('body-parser');
const chokidar = require('chokidar'); 

const cats = require('./controllers/cat');
const diseases = require('./controllers/disease');
const symptoms = require('./controllers/symptoms');
const medication = require('./controllers/medication');

const permission = require('./controllers/permission');
const address = require('./controllers/address');
const user = require('./controllers/user');

app.use(express.json());

// serve your css as static
app.use(express.static('public'));

app.set('view engine', 'html');


nunjucks.configure('views',{
  express:app,
  autoscape:true,
  noCache:false
}); 

app.use('/api/cat', cats);
app.use('/api/disease', diseases);
app.use('/api/symptoms', symptoms);
app.use('/api/medication', medication);

app.use('/api/permission', permission);

app.use('/api/address', address);
app.use('/api/user', user);


/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});

    return;
});

app.get("/", (req, res, next) => {
  res.render('index.html');
});

const selectedPage = ['disease', 'symptom', 'diagnosis'];

app.get('/:page', function(req, res) {
  page = req.params.page;
  
  if (selectedPage.includes(page)) {
    res.render('pages/'+page, {
      menuActive:page+'_active'
    });
  } else {
    res.send('404: Page not Found', 404);
  }
});

// listen on port
app.listen(3010, () => console.log('Server Running at http://localhost:3010'));