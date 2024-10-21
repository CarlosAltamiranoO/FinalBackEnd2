import productService from "./services/productService.js"

export default (io) => {

    io.on('connection', async socket => {

        console.log(`nuevo cliente conectado! socket id #${socket.id}`)
        io.sockets.emit('actualizarProductos', await productService.getProducts()) // ver si funciona
    
        socket.on('nuevoproducto', async producto => {
            const mg = await productService.createProduct(producto)
            io.sockets.emit('error', mg)
    
            io.sockets.emit('actualizarProductos', await productService.getProducts())
        })
    
        socket.on('borrado', async identificador => {
    
            if (identificador) {
                try {
                    const mg = await productService.deleteProduct(identificador)//manager.deleteProduct(parseInt(identificador))
                    if (mg === "no hay producto a eliminar") io.sockets.emit('error', "no hay producto a eliminar")
                }
                catch (error) {
                    io.sockets.emit('error', error.message)
                }
                io.sockets.emit('actualizarProductos', await productService.getProducts())
            }
            console.log("error al intentar borrar")
        })
        socket.on('modificar', async query => {
    
            if (query) {
                try {
                    const mg = await productService.updateProduct(query.id, query.data)//manager.deleteProduct(parseInt(identificador))
                }
                catch (error) {
                    io.sockets.emit('error', error.message)
                }
                io.sockets.emit('actualizarProductos', await productService.getProducts())
            }
        })
    })
}