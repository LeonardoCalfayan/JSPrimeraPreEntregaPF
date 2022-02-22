
//PRIMERA ENTREGA PROYECTO FINAL
//Se porpone realizar un simulador interactivo de un sitio de e-comerce de una Pastelería


//Las acciones a realiar serán:
//Presentación y saludo al cliente
//Ofrecer los rubros
//Ofrecer los productos de cada rubro
//Recibir las elecciones del cliente y calcular precio total
//Confirmar el pedido y cobrar el servicio

//VARIABLES
let texto = "";
let total = 0;

let arrayRubros = [];
let arrayProductos = [];
let arrayCarrito = [];

//CLASES
class Rubro{

    constructor(id, nombre){
        this.id = id,
        this.nombre = nombre
    }
}

class Producto{
    
    constructor(id, rubro, nombre, precio){
        this.id = id,
        this.rubro = rubro,
        this.nombre = nombre,        
        this.precio = precio,
        this.cantidad = 0,
        this.subTotal = 0 
    }

    subtotalProducto() {
        this.subTotal = this.precio * this.cantidad;
    }
}




const saludar = () => alert("Bienvenido a PasteLou!") //funcion para saludar

const inicializar = () =>{
    //Inicializo arreglo de Rubros
    arrayRubros.push(new Rubro(1,"Tortas Decoradas"));
    arrayRubros.push(new Rubro(2,"Pastelería Tradicional"));
    arrayRubros.push(new Rubro(3,"Rincón Salado"));
    //Inicializo arreglo de Productos
    arrayProductos.push(new Producto(1,"Tortas Decoradas","Torta Boda",5000))
    arrayProductos.push(new Producto(2,"Tortas Decoradas","Torta 15 años",4500))
    arrayProductos.push(new Producto(3,"Tortas Decoradas","Torta Bautismo y 1 Año",4000))
    arrayProductos.push(new Producto(1,"Pastelería Tradicional","CupCakes",400))
    arrayProductos.push(new Producto(2,"Pastelería Tradicional","CakePops",300))
    arrayProductos.push(new Producto(3,"Pastelería Tradicional","Cookies",200))
    arrayProductos.push(new Producto(1,"Rincón Salado","Fosforitos",150))
    arrayProductos.push(new Producto(2,"Rincón Salado","Brusquetas",200))
    arrayProductos.push(new Producto(3,"Rincón Salado","Canapes",180))
}

const rubrosDisponibles = () => {
   
    let rubroID;
    do{
        let mostrarRubros = "";
        for(let nombreRubros of arrayRubros){
            mostrarRubros += (nombreRubros.id + " " + nombreRubros.nombre + "\n")
        }
        
        rubroID = parseInt(prompt("Ingresá el número del rubro que vas a elegir por favor:\n" + mostrarRubros))

    }while(isNaN(rubroID) || rubroID <= 0 || rubroID > arrayRubros.length)

    return(arrayRubros.find((rubro => rubro.id === rubroID)))

}

const productosDisponibles = (rubroElegido) =>{
    let arregloProductosDisponibles = (arrayProductos.filter((producto) => producto.rubro === rubroElegido.nombre))
    let productoID
    do{
        let mostrarProductos = "";
        for(let productosDisponibles of arregloProductosDisponibles){
            mostrarProductos += (productosDisponibles.id + " " + productosDisponibles.nombre + " $" + productosDisponibles.precio + " c/u\n")
        }
        
        productoID = parseInt(prompt("Ingresá el número del producto que vas a elegir por favor:\n" + mostrarProductos))

    }while(isNaN(productoID) || productoID <= 0 || productoID > arregloProductosDisponibles.length)

    return(arregloProductosDisponibles.find((producto => producto.id === productoID)))

}



const solicitarCantidad = (productoElegido) => {    
    
    let cantidad;
    do{
        cantidad = parseInt(prompt("Ingresá la cantidad que vas a llevar por favor: (máximo 12 unidades)"));

    }while(isNaN(cantidad) || cantidad < 1 || cantidad > 12)
    
    productoElegido.cantidad = cantidad;
    productoElegido.subtotalProducto();

    arrayCarrito.push(productoElegido);

}

const informarCompra = () =>{

    texto = "Estás llevando:\n";
    let seguir = confirm("Desea agregar otro producto?")
    
    if(seguir === true){

        procedimientoCompra();
    
    }else{
        
        arrayCarrito.forEach(recorrerArray);
        total  = arrayCarrito.reduce((total, producto) => total + producto.subTotal, 0);
        texto += `\nTotal: ${total}` 
        alert(texto);       
    }
}

function recorrerArray(producto){
    texto +=  producto.cantidad + " " + producto.nombre + " Subtotal: " + producto.subTotal + "\n"; 
}
const confirmarCompra = () =>{

    let confirmar = confirm("Desea quitar algún producto de la lista?")
    
    if(confirmar){
        console.log(arrayCarrito);
        texto = "";
        arrayCarrito.forEach(mostrarCarrito);
        let idEliminar;
        do{
            idEliminar = parseInt(prompt("Ingresá el número de producto que querés eliminar\n" + texto));
            console.log(idEliminar)
        }while(isNaN(idEliminar) || idEliminar < 0 || idEliminar >= arrayCarrito.length)
        arrayCarrito = arrayCarrito.filter((producto,indice) => indice != idEliminar)
        console.log(arrayCarrito)
    }

    informarCompra();
}

function mostrarCarrito(producto, indice){
    texto += "Número: "+ indice + "\n " + producto.cantidad + " " + producto.nombre + " Subtotal: " + producto.subTotal + "\n"; 
}

const cobrarProductos = () =>{
    let monto = 0;
    
    do{
        monto = parseInt(prompt("Con cuanto abonás?"));
    }while(isNaN(monto))
    
    if(monto > total){
        alert("Tu vuelto es $"+(monto - total)+"\nGracias por tu compra!")
    }else if(monto === total){
        alert("Gracias por tu compra!")
    }else{
        alert("Te faltarían $"+(total-monto))
    }   
}


const procedimientoCompra = () =>{
    let rubroElegido = rubrosDisponibles();
    let productoElegido = productosDisponibles(rubroElegido);
    solicitarCantidad(productoElegido);
    informarCompra();

}

saludar();
inicializar();
procedimientoCompra();
confirmarCompra();
cobrarProductos();