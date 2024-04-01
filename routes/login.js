var express = require('express');
var router = express.Router();
var usuariosModel = require('./../models/usuariosModel');

router.get('/', function(req,res,next){
    res.render('login', {
        layout:'layoutinscripcion'
    });
});

router.post('/', async(req, res, next) => {
    try {
        var usuario = req.body.usuario;
        var password = req.body.password;

        console.log(req.body);

        var data = await usuariosModel.getUserAndPassword
        (usuario, password);

        if (data != undefined) {
            res.redirect('/admin/novedades');
        } else {
            res.render('login', {
                layout: 'layoutinscripcion',
                error: true
            });
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;