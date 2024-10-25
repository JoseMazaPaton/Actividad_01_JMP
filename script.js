import Carrito from "./Carrito.js";

const carrito = new Carrito();
let productos = [];
let moneda;

document.addEventListener('DOMContentLoaded', function(event){


    function cargaTabla(productos){
        const prodTabla = document.getElementById("cuerpoTabla");
            productos.forEach(producto => {

                // creamos una constante con la estructura que queramos que tenga el objeto a cargar.
                const prods = {
                    sku: producto.SKU,
                    title: producto.title,
                    price: producto.price,
                    cantidad: 0
                }

                //TD producto

                const productoSKU = document.createElement('td');
                const SKUDiv = document.createElement('div');
                const parr1 = document.createElement('p');
                parr1.classList.add('parrTitulo');
                const parr2 = document.createElement('p');
                parr1.textContent = prods.title;
                parr2.textContent = "REF: " + prods.sku;
                SKUDiv.append(parr1,parr2);
                productoSKU.appendChild(SKUDiv);

                // TD Cantidad

                const cantidad = document.createElement('td');
                const cantidadDiv = document.createElement('div');
                const buttonMas = document.createElement('button');
                buttonMas.classList.add('btn');
                buttonMas.textContent = "+";
                buttonMas.addEventListener('click', function(event){
                    inputCantidad.value ++;
                    carrito.agregarProducto(prods);
                    actualizarTotal();
                    mostrarCarrito();
                    console.log(carrito);
                })
                const inputCantidad = document.createElement('input');
                inputCantidad.setAttribute('type', 'number');
                inputCantidad.setAttribute('min', '0');
                inputCantidad.setAttribute('value', prods.cantidad);
                const buttonMenos = document.createElement('button');
                buttonMenos.classList.add('btn');
                buttonMenos.textContent = "-";
                buttonMenos.addEventListener('click', function() {

                    // si la cantidad es mayor de 0, solo queremos que aumente el campo cantidad

                    if (prods.cantidad > 0) {
                        prods.cantidad -= 1;
                        inputCantidad.value = prods.cantidad;
                        carrito.actualizarUnidades(prods.sku, prods.cantidad);

                        // y en el caro de que llegue a 0, queremos que nos los elimine de la lista

                        if (prods.cantidad === 0) {
                            carrito.eliminarProducto(prods.sku);
                        }                       
                        actualizarTotal();
                        mostrarCarrito();
                        console.log(carrito);
                    }

                });

                // vamos a añadir al input un evento para cuando hagamos la entrada por teclado dentro del input nos actualice el carro

                inputCantidad.addEventListener('input', function() {

                    // al crear nuestrea constante para el nuevo valor de cantidad la pasamos por math.max 
                    // para que nos devuelva el mayor numero ingresado, pasando un 0 para evitar cantidades negativas
                    // y que si alguien teclea un caracteer nos devuelva un 0.

                    const nuevaCantidad = Math.max(0, parseInt(inputCantidad.value) || 0);
                    prods.cantidad = nuevaCantidad;
                    if(nuevaCantidad === 1){
                        carrito.agregarProducto(prods);
                    }
                    if(nuevaCantidad > 1){
                        carrito.agregarProducto(prods);
                        carrito.actualizarUnidades(prods.sku, nuevaCantidad);
                    }
                    if (nuevaCantidad === 0) {
                        carrito.eliminarProducto(prods.sku);
                    }
                    
                    actualizarTotal();
                    mostrarCarrito();
                });
                cantidadDiv.append(buttonMenos, inputCantidad, buttonMas);
                cantidad.appendChild(cantidadDiv);

                // TD precio

                const precio = document.createElement('td');
                precio.innerText = prods.price + moneda;

                // TD Total

                const totalProd = document.createElement('td');
                function actualizarTotal() {
                    let valorCantidad = Number(inputCantidad.value);
                    totalProd.innerText = (valorCantidad * prods.price).toFixed(2) + moneda;
                }
                actualizarTotal();

                // Tr para crear filas

                const tr = document.createElement('tr');
                tr.append(productoSKU,cantidad,precio,totalProd);
                prodTabla.append(tr);

            })   
            mostrarCarrito();
    }
    

    function mostrarCarrito(){
        const divElementos = document.getElementById("elementosCarrito");
        divElementos.innerHTML = '';
        const prodCarrito = carrito.obtenerCarrito();
        prodCarrito.productos.forEach((carro) => {

            const divElem = document.createElement('div');
            divElem.classList.add('divElemen')
            const span1 = document.createElement('span');
            span1.classList.add('spanIzquierda')
            const span2 = document.createElement('span');
            span2.classList.add('spanDerecha')
            let text1 = `${carro.cantidad} x ${carro.title}`
            let text2 = `${carro.cantidad} x ${carro.price}${moneda}`
            span1.textContent = text1;
            span2.textContent = text2;
            divElem.append(span1,span2);
            divElementos.append(divElem);
            



        })

        const divTotal = document.getElementById("productosTotal");
        divTotal.classList.add('divElementos');
        divTotal.innerHTML = '';
        const span3 = document.createElement('span');
        const span4 = document.createElement('span');
        span4.setAttribute('placeholder', '0.00€')
        let text3 = "TOTAL";
        let text4 = `${prodCarrito.total}${moneda}`;
        span3.innerText = text3;
        span4.innerText = text4;
        divTotal.append(span3, span4);




    }





    fetch('https://jsonblob.com/api/1297147239502569472')
    .then(response => response.json())
        .then(carro => {
            productos = carro.products;
            moneda = carro.currency;
            cargaTabla(productos);
     
    });
})




