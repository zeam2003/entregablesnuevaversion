const fs = require('fs');
const { faker } =  require('@faker-js/faker');
faker.locale = 'es';
const { commerce, image } = faker;
const nombreArchivo = './data/productos.json'
let productosAlmacenados =[];

/* let productosAlmacenados =[
    {
        'title' : 'Reloj',
        'price': 1500,
        'thumbail': 'https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-512.png'
    },
    {
        'title' : 'Calculadora',
        'price': 2730,
        'thumbail': 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
    },
    {
        'title' : 'Mochila',
        'price': 1500,
        'thumbail': 'https://cdn3.iconfinder.com/data/icons/education-209/64/bag-pack-container-school-512.png'
    },
];
 */
class Contenedor {
    constructor(nombreArchivo) {
        // this.obtener();
        this.nombreArchivo = nombreArchivo;
    }

    async obtener() {
        try {
        //    const data = await fs.promises.readFile(nombreArchivo, 'utf-8');
        //    productosAlmacenados = JSON.parse(data);
           //console.log(productosAlmacenados)

           let info = [];
            const lista = [];
            let cantidades = 10;
            
            for (let index = 0; index < cantidades; index++) {
                if(!info.includes(info.product)) {
                    info.push({id: index, title: commerce.product(), price: commerce.price(), thumbail: image.abstract()});
                } else {
                    console.log('duplicado')
                }
                
            }
            return info
        } catch (error) {
            console.log('error', error);
        }
    }

    // Guardamos el producto
    async save(producto) {
        try {
            const id = productosAlmacenados.length +1;
            const cuerpo = {id: id, ...producto}
            productosAlmacenados.push(cuerpo);
            // console.log('en base', productosAlmacenados);
            //return producto;
            return console.log('grabado', productosAlmacenados);
        } catch (error) {
            console.error('se presentó el siguiente inconveniente al intentar guardar: ', error);
        }
       
    }

    // Obtenemos un producto por ID
    async getById(id) {
        if (id == ''){
            console.log(id);
        }
        try {
            const producto = productosAlmacenados.find((producto) => producto.id == id);
            if(producto) {
                return producto;
            } else {
                return "Producto no encontrado";
            } 
        } catch (error) {
            return `Se produjo el siguiente inconveniente: ${error}`;
        }
  
    }

    // Obtenemos todos los productos
    async getAll() {
        
        try {
            if(productosAlmacenados.length === 0 ) {
                return productosAlmacenados;
            } else {
                return productosAlmacenados;
            }
        } catch (error) {
            return `Se produjo el siguiente inconveniente: ${error}`;
        }
    }

    // Busqueda general
    async search(criteria) {
       console.log(criteria);
    }

    // Actualizar por ID
    async updateById(id, cuerpo){
        try {
            // console.log(cuerpo);
            let producto = productosAlmacenados.find((producto) => producto.id == id);
            if(producto) {
                
                productosAlmacenados = productosAlmacenados.map( brand => {
                    if ( brand.id == id ) {

                        producto =  { id: producto.id, ...cuerpo};
                        console.log('traigo', producto);
                        return producto;
                    }
                    console.log('este', brand);

                    return brand;
                });
                return producto;
            } else {
                return 'no hay nada';
            }
            
           
        } catch (error) {
            return `Se produjo el siguiente inconveniente: ${error}`;
        }
    }

    // Borramos por ID
    async deleteById(id) {
        try {
            let producto = await productosAlmacenados.find((producto) => producto.id == id);
            if(producto) {
                productosAlmacenados =  productosAlmacenados.filter( producto => producto.id != id);
                return 'Se ha eliminado el producto';
            } else {
                return 'Ese producto no se encuentra registrado';
            }
        } catch (error) {
            return `Se produjo el siguiente inconveniente: ${error}`;
        }
        
    }

    // Borramos todo
    async deleteAll() {
        try {
            const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");
            let productos = JSON.parse(data);
            if(productos.length == 0) {
                return `No hay productos para eliminar`;
            } else {
                productos = [];
                const productDelete = JSON.stringify(productos);
                await fs.promises.writeFile(this.nombreArchivo, productDelete);
                return 'Se han eliminado los productos';
            }
        } catch (error) {
            return `Se produjo el siguiente inconveniente: ${error}`;
        }
        
    }

}

async function inicio() {
    const contenido = new Contenedor('.data/productos.json');
}

module.exports = Contenedor;
