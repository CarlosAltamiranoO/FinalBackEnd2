const agegarCarrito = document.querySelectorAll('.agergarProducto');
agegarCarrito.forEach(function (boton) {

    boton.addEventListener('click', async () => {
        try {
            console.log("entro al evento")
            const cartId = document.getElementById("carrito").textContent;
            const productId = boton.getAttribute('data-product-id');
            const productTitle = boton.getAttribute('data-product-name');
            await fetch(`/api/carts/${cartId}/product/${productId}/`, { method: 'post' })
            document.getElementById('respuesta').innerHTML = `se agrego el producto: ${productTitle}`
        } catch (error) {
            console.log(error)
        }
    });
})