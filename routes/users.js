var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Nos alegra tenerte aquí. En nuestro sitio, encontrarás una gran variedad de recursos, productos o servicios que seguramente te serán útiles. Estamos comprometidos a brindarte la mejor experiencia posible y a satisfacer tus necesidades de la mejor manera.');
});

module.exports = router;
