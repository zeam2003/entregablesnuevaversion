const { faker } =  require('@faker-js/faker');
faker.locale = 'es';
const { name, internet, commerce, image } = faker;


class Generador{
    constructor(){
        
    }
    
    
    async generarUsuarios(cant){
        try {
            let info = [];
            const lista = [];
            let cantidades = cant;
            for (let index = 0; index < cantidades; index++) {
                if(!info.includes(info.email)) {
                    info.push({id: index, nombre: name.firstName(), apellido: name.lastName(), email: internet.email()});
                } else {
                    console.log('duplicado')
                }
                
            }
            return info
        } catch (error) {
            return 'se produjo un error'
        }
        
    } 

    async obtenerProductos(cant) {
        try {
        //    const data = await fs.promises.readFile(nombreArchivo, 'utf-8');
        //    productosAlmacenados = JSON.parse(data);
           //console.log(productosAlmacenados)

           let info = [];
            const lista = [];
            let cantidades = cant;
            for  (let index = 0; index < cantidades; index++) {
                if(!info.includes(info.product)) {
                    info.push({id: index, title: commerce.productName(), price: commerce.price(), thumbail: image.technics()});
                    
                } else {
                    console.log('duplicado')
                }
                
            }
            return info
        } catch (error) {
            console.log('error', error);
        }
    }

     obtenerProductosRandom = async() => {
        try {
            let obtenerRandom = await fetch(`http://localhost:8080/api/generadores/productos?cant=5`)
            let obtenido = await obtenerRandom.json()
            return obtenido;
            // console.log('hola')
        } catch (error) {
            console.log(error)
        }
        
    }
    
}

module.exports = Generador;

