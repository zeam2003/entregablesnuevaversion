const express = require('express');
const {Router} = express;

const db = require('../controllers/generador.controller.js');
const router = Router();

const localDB = new db();

router.get('/usuarios', async (req, res)=>{
    
    const {cant = 10} = req.query;
    generado = await localDB.generarUsuarios(cant);
    //console.log('esto obtuve', generado)
    res.send(generado);
})

router.get('/productos', async (req, res)=>{
    
    const {cant = 10} = req.query;
    generado = await localDB.obtenerProductos(cant);
    //console.log('esto obtuve', generado)
    res.send(generado);
})

module.exports = router;