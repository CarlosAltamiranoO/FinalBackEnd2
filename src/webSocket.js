import productService from "./services/productService.js"

export default (io) => {

    io.on('connection', async socket => {

        console.log(`nuevo cliente conectado! socket id #${socket.id}`)
        console.log(await productService.getProducts())
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
        })
    })
}