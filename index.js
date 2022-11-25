const express = require('express');
const bodyParser = require('body-parser');
const {Server: HttpServer, get} = require('http');
const {Server: SocketServer} = require('socket.io');

// view engine
const handlebars = require('express-handlebars');

let Mensajes =  [];
let Productos = [];

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

const productosRouter = require('./routes/productos.js');
const generadoresRouter = require('./routes/generadores.js')
const mas = require('./controllers/generador.controller.js')
const localDB = new mas();


app.set('view engine', 'hbs');
app.set("views", __dirname + "/views");
const hbs = handlebars.engine({
    extname: 'hbs',
    layoutsDir: './views/layouts/',
});

// frontend - Hnadlebars
app.get('/registro', (req, res) => {
    res.render('main', {layout: 'registro'});
});

app.get('/listado', async (req, res) => {

    if (Productos.length == 0) {
        Productos = await localDB.obtenerProductosRandom()
        res.render('main', {layout: 'productos', Productos});
    } else {
        console.log('esto obtengo ', Productos)
        res.render('main', {layout: 'productos', Productos});
    }
});


app.engine('hbs', hbs);


// Web Sockets
io.on('connection', async(socket) => {

   if( Productos.length == 0) {
    Productos = await localDB.obtenerProductosRandom();
    socket.emit('productos', Productos);
   } else {
        socket.emit('productos', Productos);
   }
    
    socket.emit('mensajes', Mensajes);

    // escucha los mensajes
    socket.on('new_msg', data => {
        console.log('recibo', data);
        Mensajes.push(data);
        io.sockets.emit('mensajes', Mensajes);
    });
});



app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/productos', productosRouter);
app.use('/api/generadores', generadoresRouter);

app.use(express.static(__dirname + '/public'));



app.get('/', (req, res) => {
   res.send('Hello world');
});

httpServer.listen(8080, () => { console.log('Servidor Express + Sockets - Activo'); });