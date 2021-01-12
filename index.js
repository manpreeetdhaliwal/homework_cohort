const express = require('express');
const fs = require('fs')
const app = express();
const path= require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
app.use(express.static(path.join(__dirname, 'public')));
const logger = require('morgan');
const bodyParser = require('body-parser')

app.set('view engine', 'ejs'); 
app.use(express.urlencoded({extended:true}));

app.use(methodOverride((req, res) => {
    if (req.body && req.body._method) {
      const method = req.body._method;
      return method;
    }
  }))

  app.use(cookieParser());
  app.use(logger('dev')); 




  const cohortsRouter = require('./routes/cohorts');
  app.use('/cohorts', cohortsRouter);




const ADDRESS = 'localhost'; // the loopback address this is your home for your machine. The IP is 127.0.0.1
const PORT = 3000;
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listening on ${ADDRESS}:${PORT}`);
});