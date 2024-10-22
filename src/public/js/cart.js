const eliminarBotones = document.querySelectorAll('#eliminarProducto');
const vaciarCarritoButton = document.querySelector('#vaciarCarrito');

eliminarBotones.forEach(function (boton) {

    boton.addEventListener('click', async () => {
        try {
            const cartId = document.getElementById("prueba").textContent;
            const productId = boton.getAttribute('data-product-id');
            const res = await fetch(`/api/carts/${cartId}/product/${productId}/`, { method: 'delete' })
            const respuesta = await res.json()
            location.reload()
        } catch (error) {
            console.log(error)
            //location.reload()
        }
    });
})

vaciarCarritoButton.addEventListener('click', async () => {
    try {
        const cartId = document.getElementById("prueba").textContent;
        const res = await fetch(`/api/carts/${cartId}`, { method: 'delete' })
        const respuesta = await res.json()
        location.reload()
    } catch (error) {
        console.log(error)
        //location.reload()
    }
})