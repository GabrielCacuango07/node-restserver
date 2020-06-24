//firts  file to read and execute read the config firts
require('./config/config');
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

// capa intermedia que va a estar procesando cosas middelword en este caso procesa todas las peticiones 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


 
app.get('/usuario', function (req, res) {
  res.json('get Usuarios');
});
app.post('/usuario', function (req, res) {
    let body = req.body;
    //validation of data information send 
    if(body.nombre === undefined){
        res.status(400).json({
            ok:false,
            message:'the name is required for register'
        });
    }else {  
        res.json({persona:body});
    }

  });
  app.put('/usuario/:id', function (req, res) {
      let id=req.params.id;
    res.json({
        id
    });
  });
app.delete('/usuario', function (req, res) {
    res.json('delete  Usuarios');
  });
  //the porcess.env.PORT is getting from config.js
app.listen(process.env.PORT,()=>{
    console.log('escuchando puerto',3000);
}) 