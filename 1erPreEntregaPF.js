
//Desafio Complementeario 2  - Basado en simulador Desafío 1 coon agregado de arreglo de objetos y uso de algunos métodos 

//Se porpone realizar un simulador interactivo de un sitio de e-comerce de una Pastelería

//Las acciones a realiar serán:
//Presentación y saludo al cliente
//Ofrecer los rubros
//Ofrecer los productos de cada rubro
//Recibir las elecciones del cliente y calcular precio total
//Confirmar el pedido y cobrar el servicio


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
        this.SubTotal = 0 
    }

    subtotaProducto() {
        this.subTotal = this.precio * this.cantidad;
    }
}


let arrayRubros = [];
let arrayProductos = [];

const saludar = () => alert("Bienvenido a PasteLou!") //funcion para saludar

const inicializar = () =>{
    //Inicializo arreglo de Rubros
    arrayRubros.push(new Rubro(1,"Tortas Decoradas"));
    arrayRubros.push(new Rubro(2,"Pastelería Tradicional"));
    arrayRubros.push(new Rubro(3,"Rincón Salado"));
    //Inicializo arreglo de Productos
    arrayProductos.push(new Producto(1,"Tortas Decoradas","Boda",5000))
    arrayProductos.push(new Producto(2,"Tortas Decoradas","15 años",4500))
    arrayProductos.push(new Producto(3,"Tortas Decoradas","Bautismo y 1 Año",4000))
    arrayProductos.push(new Producto(4,"Pastelería Tradicional","CupCakes",400))
    arrayProductos.push(new Producto(5,"Pastelería Tradicional","CakePops",300))
    arrayProductos.push(new Producto(6,"Pastelería Tradicional","Cookies",200))
    arrayProductos.push(new Producto(7,"Rincón Salado","Fosforitos",150))
    arrayProductos.push(new Producto(8,"Rincón Salado","Brusquetas",200))
    arrayProductos.push(new Producto(9,"Rincón Salado","Canapes",180))
}

const rubrosDisponibles = () => {
   
    let rubroID;
    do{
        let mostrarRubros = "";
        for(let nombreRubros of arrayRubros){
            mostrarRubros += (nombreRubros.id + " " + nombreRubros.nombre + "\n")
        }
        
        rubroID = parseInt(prompt("Ingresá el número del rubro que vas a elegir por favor:\n" + mostrarRubros))


    }while(isNaN(rubroID) || rubroID <= 0 || rubroID >= 4)

    return(arrayRubros.find((rubro => rubro.id === rubroID)))


}

const productosDisponibles = (rubroElegido) =>{
    let arregloProductosDisponibles = (arrayProductos.filter((producto) => producto.rubro === rubroElegido.nombre))
    console.log(arregloProductosDisponibles.length)
    do{
        let mostrarProductos = "";
        for(let productosDisponibles of arregloProductosDisponibles){
            mostrarProductos += (productosDisponibles.id + " " + productosDisponibles.nombre + "\n")
        }
        
        productoID = parseInt(prompt("Ingresá el número del producto que vas a elegir por favor:\n" + mostrarProductos))


    }while(isNaN(productoID) || productoID <= 0 || productoID > arregloProductosDisponibles.length)

}



const calcularPrecio = (rubroElegido) => {    
    return(rubroElegido.precio)

}

let texto = "";
let total = 0;

const informarCompra = (rubroElegido, precioProducto) =>{

    total += precioProducto
    texto += `Producto: ${rubroElegido.nombre}\n Importe: ${precioProducto}\n`;
    
    let seguir = confirm("Desea agregar otro producto?")
    if(seguir === true){

        procedimientoCompra()
    }else{
        alert("Usted lleva:\n" + texto + `\nEl importe total es ${total}` );

    }

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
    let precioProducto = calcularPrecio(productoElegido);
    informarCompra(rubroElegido, precioProducto);

}

saludar();
inicializar();
procedimientoCompra();
cobrarProductos();