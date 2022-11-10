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

// Web Sockets
io.on('connection', (socket) => {
    //obtener();
    //console.log(`conectado: ${socket.id}`);
    socket.emit('productos', Productos);
    socket.emit('mensajes', Mensajes);

    // escucha los mensajes
    socket.on('new_msg', data => {
        //console.log(data);
        Mensajes.push(data);
        io.sockets.emit('mensajes', Mensajes);
    });
});


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

app.get('/listado', (req, res) => {
    //obtener();
    console.log('esto tengo', Productos.length);
    res.render('main', {layout: 'productos', Productos});
});


app.engine('hbs', hbs);

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/productos', productosRouter);

app.use(express.static(__dirname + '/public'));



app.get('/', (req, res) => {
   res.send('Hello world');
});

httpServer.listen(8080, () => { console.log('Servidor Express + Sockets - Activo'); });