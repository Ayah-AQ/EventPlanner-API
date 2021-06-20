const  express= require("express");
const router = express.Router()
//controlers
const {eventData, eventDelete, eventAdd,eventUpdate,eventDetails,fullBooked,searchList} = require ("../controllers/plannerData")


//route path
router.get("/",eventData)
//full
router.get("/full", fullBooked);
//search
router.get("/:query",searchList)
//Delete 
router.delete("/delete",eventDelete);
// Add
router.post("/",eventAdd);
//update
router.put("/:eventId",eventUpdate);
//Details
router.get("/:eventId",eventDetails);


module.exports = router