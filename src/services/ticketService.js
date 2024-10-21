import ticketRepository from "../repositories/ticketRepository.js";

class TicketService {
    async findOne(query){
        return await userRepository.findOne(query)
    }
    async registerTicket (ticketData){
        return await ticketRepository.createTicket({
            code: ticketData.codigo, 
            purchase_dateTime: ticketData.fecha, 
            amount: ticketData.total, 
            purchaser: ticketData.email
        })

    }
}

export default new TicketService(); 