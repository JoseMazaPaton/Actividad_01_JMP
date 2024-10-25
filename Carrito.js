class Carrito{

  #productos;
  
    constructor(){
      this.#productos = [];

    }


    actualizarUnidades(sku, cantidad) {

      // no creamos una constante, a la cual le pasamos el id con el producto que quermos con el .find. si este existe cambiamos la cantida.
    
      const producto = this.#productos.find(prod => prod.sku === sku);
      if (producto) {
          producto.cantidad = cantidad;
      }
    }
  
    
    obtenerInformacionProducto(sku){

      // buscamos si existe ese producto con el id proporcionado y devolvermos los datos que queremos

      if (this.#productos.find((prods) => prods.sku === sku)){
        return {SKU: prods.sku, 
                Cantidad: prods.cantidad
            }
      }
    }

    obtenerCarrito(){

      // en este metodo como quermos obtener el valor Total de nuestro carrito de productos, inicializamos nuestra variable y pasando por el array le damos el valor de la suma de los precios por las cantidades.

      let total = 0;
      this.#productos.forEach(producto => {
        total += producto.price * producto.cantidad;
      })
      // y detallamos lo que quermos devolver, el total pasandole el total anteiormente declarado
      return{
        total: total.toFixed(2),
        currency: "€",

        // y pasamos nuestra lista de productos por map para crear un nuevo array a devolver con los atributos que queremos e indicando su valor.
        productos: this.#productos.map(producto => ({
          sku: producto.sku,
          title: producto.title,
          cantidad: producto.cantidad,
          price: producto.price
        }))
      }



  
    }


  agregarProducto(producto) {

    // vemos si existe nuestro producto, en caso afirmativo aumentamos su cantidad en uno y sino le decimos el valor de su parametro cantidad y lo cargamos al array.

    const productoExistente = this.#productos.find((prod) => prod.sku === producto.sku);
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        producto.cantidad = 1;
        this.#productos.push(producto);
    }
}



    eliminarProducto(sku) {

      // teniendo el id le decimos a nuestro array que cambie su valor al mismo array al que le pasamos el .filter añadiendo todos los productos que no coincidan con el id pasado (tenemos el mismo array pero eliminando el que quermos)
      this.#productos = this.#productos.filter(prod => prod.sku !== sku);
  }

}
export default Carrito;