var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', function(req,res,next){
    res.render('inscripcion', {
        layout:'layoutinscripcion'});
});

router.post('/', async (req,res,next) => {
  
    console.log(req.body)
  
    var nombre = req.body.nombre;
    var dni = req.body.dni;
    var email = req.body.mail;
    var tel = req.body.tel;
    var domicilio = req.body.domicilio;
    var carrera = req.body.carrera;
    
    var obj = {
      to:"jmunozcalello@gmail.com",
      subject:"Inscripcion",
      html: nombre + " dni: " + dni + " email: " + email + " tel: " + tel + " domicilio: " + domicilio + " envio una solicitud para inscribirse a la carrera: " + carrera 
    }
    var transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS 
      }
    });
  
    var info = await transport.sendMail(obj);
    res.render('inscripcion', {
        a: "Inscripcion enviada",
      });
  });



module.exports = router;