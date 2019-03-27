////// OWS INDEX
'use strict';

//// Core Modules
const
fs = require('fs');

//// Contributed Modules
const 
dotenv  = require('dotenv'),
express = require('express'),
helmet  = require('helmet'),
app     = express();

dotenv.config();

const {
  OWS_HOST,
  OWS_PORT,
  SITE_ROOT,
} = process.env;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(helmet());
app.use(express.static('./public'));

app.locals.site_root = SITE_ROOT;

app.get('/', async (req, res) => {

  return res.render('index', {
    pageTitle: 'Start a Brand',
    contentClass: 'index'
  });

});

app.get('/resume', async (req, res) => {

  const file = fs.createReadStream('./public/cv/jeff_straney_resume.pdf'),
        stat = fs.statSync('./public/cv/jeff_straney_resume.pdf');

  res.setHeader('Content-Length', stat.size);
  res.setHeader('Content-Type', 'text/pdf');
  res.setHeader('Content-Disposition', 'attachment;filename=jeff_straney_resume.pdf');

  file.pipe(res);
   
});


app.listen(OWS_PORT, OWS_HOST, () => {

  console.log('orlandowebspecialist.com');
  console.log('\thost: %s', OWS_HOST);
  console.log('\tport: %s', OWS_PORT);

});

// catch all
app.get('*', (req, res) => {

  return res.status(404).render('404.pug');

});

// error handler
app.use((err, req, res, next) => {

  console.error(err);

  return res.status(404).render('404.pug');

});

