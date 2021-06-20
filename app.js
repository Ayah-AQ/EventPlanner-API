const  express= require("express")
//routes
let eventRouter = require ("./routes/plannerData")
//
const db = require("./db/models")
const app = express();
const PORT = 8000
//methode
app.use(express.json() );
app.use("/events", eventRouter)



db.sequelize.sync()
// db.sequelize.sync({alter: true});
// db.sequelize.sync({force: true});

app.listen(8000,()=> 
console.log(`The app-location runs on localhost:${PORT}`)
);

