const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticket.model");
const { generateTambolaTicket } = require("../utils/ticket.generator");

const create = asyncHandler(async (req, res) => {
    const nunOfTicket = req.query.value;
    if (!nunOfTicket) {
        res.status(400);
        throw new Error("Please specify, how many Ticket you want to generate?");
    }
    let arrayOfId = [];
    for (let i = 0; i < nunOfTicket; i++) {
        const ticketPattern = generateTambolaTicket();
        const newTicket = await Ticket.create({
            userId: req.user.id,
            ticket: ticketPattern
        })
        arrayOfId.push(newTicket._id);
    }

    res.status(200).send(arrayOfId);
})

const get = asyncHandler(async (req, res) => {
    const page = req.query.page || 0;
    const limit = req.query.limit || 1;
    const ticketList = await Ticket.find({ userId: req.user.id }).limit(limit).skip(limit * page)
    res.json(ticketList);
})

module.exports.ticket = {
    create,
    get
}