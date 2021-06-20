const  express= require("express");
const slugify = require("slugify");
const {Event}= require("../db/models");
const { Op } = require("sequelize");

exports.eventData = async(req,res)=>{
  try {
    // if (!Object.keys(req.body).length) console.log("empty");
    if (req.body.date) {
   
      const eventData = await Event.findAll({
        where: {
          startDate: {
            [Op.gt]: req.body.date,
          },
        },
        attributes: ["id", "name", "image"],
        order: ["startDate", "name"],
      });
      res.json(eventData);
    } else {
      const eventData = await Event.findAll({
        attributes: ["id", "name", "image"],
        order: ["startDate", "name"],
      });
      res.json(eventData);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.eventDelete=async (req, res) => {
  try {
    let missingID = null;

    for (const event of req.body) {
      let deleted = await Event.findByPk(event);
      if (!deleted) missingID = event;
    }

    if (missingID) {
      res.status(404).json({ message: `event ${missingID} not found` });
    } else {
      const deletedevents = await Event.destroy({ where: { id: req.body } });
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
    };

exports.eventAdd=async (req,res)=>{

    try {
        const eventAdd = await Event.create(req.body);
        res.status(201).json(eventAdd);
      } catch (error) {
        res.status(500).json({ message: error.message || "server error" });
             }

            }

exports.eventUpdate =async (req, res) => {
  try {
    const updated = await Event.findByPk(req.params.eventId);
    if (updated) {
      await updated.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

            exports.eventDetails=  async (req, res) => {
                try {
                    const event = await Event.findByPk(req.params.eventId);
                    if(event){
                        res.status(200).json(event)
                    }
                    else{
                        res.status(204).json({ message: "event is not found" });
                    }

                }
                catch (error) {
                    res.status(500).json({ message: error.message });
                    
                  }
                }
 exports.fullBooked = async (req, res) => {
  try {
      const bookedEvents = await Event.findAll({ 
      where:{bookedSeats: {
        [Op.eq]: {[Op.col]:"numOfSeats"}}
      }})
      res.json(bookedEvents);
  } catch(error) {
      res.status(500).json({message: error.message})
  }
}
exports.searchList = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: {
        name: { [Op.iLike]: req.params.query },
      },
    });
    res.json(events);
  } catch (error) {
    res.json({ message: error.message });
  }
};