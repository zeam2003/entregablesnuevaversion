function render(data) {
    const html = data.map(msg => `
    <div class="bubbleWrapper" >
        <div class="inlineContainer">
        <div class="ownBubble own">${msg.autor}</div>
        
        <div class="otherBubble other" >
            ${msg.msj}
        </div>
        </div><span class="other">${msg.fecha}</span>
    </div>
    `
    ).join(" ");

    document.getElementById('mensajes').innerHTML = html;
}

function renderTable(data) {
    const html = data.map(datos =>`
    <tr>
        <td scope="row">${datos.title}</td>
        <td scope="row">$ ${datos.price}</td>
        <td scope="row"><img style="width: 25px; height: 25px;" src=${datos.thumbail}></td>
    </tr>
    `).join(" ");
    document.getElementById('contenido_tabla').innerHTML = html;
}

function renderListado(data) {
    const html = data.map(datos =>`
    <tr>x
        <td scope="row">${datos.title}</td>
        <td scope="row">$ ${datos.price}</td>
        <td scope="row"><img style="width: 25px; height: 25px;" src=${datos.thumbail}></td>
    </tr>
    `).join(" ");
    document.getElementById('contenido_tabla').innerHTML = html;
}


const socket = io.connect();

function enviarMensaje(event) {
    const nombre = document.getElementById('nombre').value;
    const msj = document.getElementById('chat_mensaje').value;
    document.getElementById('chat_mensaje').value ="";
    //console.log(msj)
    socket.emit('new_msg', {autor: nombre, msj: msj, fecha: new Date().toLocaleString('es-es')});
    return false;
}

function avisoCarga(event) {
    const boton = document.getElementById('enviar-carga').addEventListener('click', () => {
        socket.on('listado', data => {
            renderListado(data)
        })
    });
    
    //console.log(msj)
    socket.emit('new_msg', {autor: nombre, msj: msj, fecha: new Date().toLocaleString('es-es')});
    return false;
}

socket.on('mensajes', data => {
    //console.log(data);
    render(data);
});

socket.on('productos', data => {
    //console.log(data);
    renderTable(data);
})

socket.on('listado', data => {
    renderListado(data)
})
