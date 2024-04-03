import ticketModel from "../dao/models/ticket.model.js";

export default class TicketDB {
    constructor() { }

    createTicket = async (obj) => await ticketModel.create(obj)

}