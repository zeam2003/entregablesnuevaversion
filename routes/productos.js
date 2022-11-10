const express = require('express');
const {Router} = express;

const db = require('../controllers/producto.controller.js')
const router = Router();



const localDB = new db();

router.post('/', async (req, res) => {
    console.log(req.body);
    //let recibido = req.body;

    let recibido = {title, price, thumbail} = req.body;
    creado = await localDB.save(recibido);
    //res.send({"producto": {title, price, thumbail}});
    
    res.redirect('/registro');
    res.send(creado);
});

router.get('/', async (req,res) => {
    const data = await localDB.getAll();
    res.send(data);
}); 


router.get('/:id', async (req,res) => {
    const { id } = req.params;
    const data = await localDB.getById(id);
    res.send(data);
});

router.get('/productRandom', async (req, res) => {
    const data = await localDB.getAll();
    let ran = Math.random()*data.length | 0;
    res.send(data[ran]); 
 
});

router.put('/:id', async (req,res) => {
    const { id } = req.params;
    const cuerpo = { title: req.body.title, price : req.body.price, thumbail : req.body.thumbail } ;
    //console.log(cuerpo);
    const data = await localDB.updateById(id, cuerpo);
    res.send(data);
});

router.delete('/:id', async (req,res) => {
    const { id } = req.params;
    const data = await localDB.deleteById(id);
    res.send(data);
});


module.exports = router;