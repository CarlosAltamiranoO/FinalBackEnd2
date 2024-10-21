import ticketModel from "./models/ticketModel.js";

class TicketDao {
    async findById(id){
        return await ticketModel.findById(id); 
    }

    async findOne(query) {
        return await ticketModel.findOne(query); 
    }

    async save(ticketData) {
        const ticket = new ticketModel(ticketData);
        return await ticket.save(); 
    }
}

export default new TicketDao(); 