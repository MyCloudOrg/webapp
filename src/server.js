const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();
const client = require('./Logger/statsd');

router.get('/healthz', (req, res) => {
    console.log('inside get request');
    client.increment('healthz');
    res.send({"Success":'Connected to server'});
});


router.get('*', (req, res) => {
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
     res.send({"error":'url not defined'});
});
router.put('*', (req, res) => {
  res.status(400);
  res.setHeader('Content-Type', 'application/json');
   res.send({"error":'url not defined'});
});
router.post('*', (req, res) => {
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
     res.send({"error":'url not defined'});
});
router.delete('*', (req, res) => { res.status(400);
  res.setHeader('Content-Type', 'application/json');
   res.send({"error":'url not defined'});
});
router.patch('*', (req, res) => { res.status(400);
  res.setHeader('Content-Type', 'application/json');
   res.send({"error":'url not defined'});
});


app.use('/v1/user', require('./controller/controller'));
 app.use('/v1/product', require('./controller/productController'));
app.use('/v1', require('./controller/imageController'));
app.use('/', router);
module.exports = app;