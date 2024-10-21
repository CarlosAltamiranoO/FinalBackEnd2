const serverSocket = io('http://localhost:8080')

const btnEnviar = document.querySelector('#btnEnviar')
const btnBorrar = document.querySelector('#btnBorrar')

if (btnEnviar) {
    btnEnviar.addEventListener('click',
        evento => {

            const inputTitle = document.querySelector('#inputTitle')
            const inputDescription = document.querySelector('#inputDescription')
            const inputPrice = document.querySelector('#inputPrice')
            const inputThumbnail = document.querySelector('#inputThumbnail')
            const inputstatus = document.querySelector('#inputStatus')
            const inputCode = document.querySelector('#inputCode')
            const inputCategory = document.querySelector('#inputCategory')
            const inputStock = document.querySelector('#inputStock')
            if (inputCode && inputStock && inputDescription && inputPrice && inputTitle && inputCategory) {
                const title = inputTitle.value
                const description = inputDescription.value
                const category = inputCategory.value
                const price = parseFloat(inputPrice.value)
                const thumbnail = inputThumbnail.valu
                const status = (/false/i).test(inputstatus.value)
                const code = inputCode.value
                const stock = parseInt(inputStock.value)
                serverSocket.emit('nuevoproducto', { title, description, price, thumbnail, code, stock, status, category })
            }
        }
    )
}
if (btnBorrar) {
    btnBorrar.addEventListener('click',
        evento => {
            const imputId = document.querySelector('#inputId')
            if (imputId) {
                const id = imputId.value
                serverSocket.emit('borrado', id)
            }
        }
    )
}
serverSocket.on('actualizarProductos', productos => {
    const divProductos = document.querySelector('#productos')
    if (divProductos) {
        let mensaje = ""
        for (producto of productos) {
            mensaje += `<h4> - ID: ${producto._id} | Titulo: ${producto.title} | Categoria: ${producto.category} | codigo: ${producto.code} | Precio: ${producto.price}  | Stock: ${producto.stock} |
            status: ${producto.status}<h4/>`
        }
        divProductos.innerHTML = mensaje
    }
})
serverSocket.on('error', error => {
    const pError = document.querySelector('#error')
    if (pError) {
        pError.innerHTML = JSON.stringify(error)
    }
})