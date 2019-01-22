express = require('express');
var app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'))
//rutas

//app.get('/', function(req, res) { res.render('pages/index') })
app.get('/', function(req, res) { res.render('pages/index')})

//app.listen(80, function () { console.log('server prueba esta corriendo en el puerto 80!') }) 
app.listen(4020, function () { console.log('server prueba esta corriendo en el puerto 4020!') }) 
