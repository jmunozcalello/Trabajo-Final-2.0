var express = require('express');
var router = express.Router();
var novedadesModel = require('./../../models/novedadesModel');

router.get('/', async function(req,res,next) {
    var novedades = await novedadesModel.getNovedades();
    res.render('admin/novedades', {
        layout:'layoutinscripcion',
        novedades
    });
});

router.post('/', async (req,res,next) => {
    try {
        if (req.body.titulo != "" && req.body.desarrollo != "") {
        await novedadesModel.insertNovedad(req.body);
        res.redirect('/')    
    } else {res.render('/admin/novedades', {
      layout: 'layoutinscripcion',
      error: true, a:'Todos los campos son requeridos'  
    })
    }
    }catch(error) {
        console.log(error)
        res.render('admin/novedades', {
        layout: 'layoutinscripcion',
        error: true, a: 'no se cargo la novedad'    
        });
    }
});

router.get('/eliminar', (req,res,next) => {
    res.render('admin/eliminar', {
        layout:'layoutinscripcion',
    });
});

router.post('/eliminar', async(req,res,next) => {
    var id = req.body.id;
    await novedadesModel.deleteNovedadById(id);
    res.redirect('/')
});


module.exports = router;