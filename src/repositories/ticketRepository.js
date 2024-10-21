import TicketDao from "../dao/ticketDao.js"; 

class TicketRepository {
    async createTicket(ticketData) {
        return await TicketDao.save(ticketData); 
    }

    async getUserById(id) {
        return await TicketDao.findById(id); 
    }

    async findOne(query){
        return await TicketDao.findOne(query);
    }

}

export default  new TicketRepository(); 