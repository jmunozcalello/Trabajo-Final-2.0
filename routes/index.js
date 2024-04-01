var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var novedadesModel = require('./../models/novedadesModel');

/* GET home page. */
router.get('/',async function (req,res,next){
  var novedades = await novedadesModel.getNovedades();
  res.render('index', {
    layout: 'layout',
    novedades
  });
});

router.post('/', async (req,res,next) => {
  
  console.log(req.body)
  var email = req.body.email;
  var motivo = req.body.motivo;
  
  var obj = {
    to:"jmunozcalello@gmail.com",
    subject:"Contacto",
    html: "Un usuario con el email: " + email + " se contacto debido a: "
    + motivo
  }
  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS 
    }
  })

  var info = await transporter.sendMail(obj);

  res.render('index', {
    message: "Mensaje enviado correctamente",
  });
})



module.exports = router;
