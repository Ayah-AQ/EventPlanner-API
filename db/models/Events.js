
const { Op } = require("sequelize");
module.exports =(sequelize,DataTypes)=> {
    const Event =sequelize.define("Event",{
    
    organizer:{
        type: DataTypes.STRING,
        max:20,
        unique:true
    } ,
    name:{
        type: DataTypes.STRING,
        validate: {
            sc() {
              if (this.name.includes("event")) {
                throw new Error("You can't add (event) in name");
              }
            },}

    },
email:{
    type: DataTypes.STRING,
    allowNull:false,
    validate:{
        isEmail : true
    }
},

image:{
    type: DataTypes.STRING,
    allowNull: false
},

numOfSeats:{
    type: DataTypes.INTEGER,
    validate: {
        min:0,
        isPositive(value) {
            if (value < 0) {
              throw new Error("Only positive values are allowed!");
            }
          },
    },
},
bookedSeats:{
    type: DataTypes.INTEGER,
    validate: {
        isGreater() {
            if (this.bookedSeats > this.numOfSeats) {
              throw new Error("Booked seats exceeded the limit.");
            }
          },
    },
},
startDate: { 
    type: DataTypes.DATEONLY, 
    allowNull: true,
    validate: {
        checkNull(value) {
            if(value === null && this.endDate !== null){
                throw new Error("Start date can't be null unless end date is");
            }
        }
    }
},
endDate: { 
    type: DataTypes.DATEONLY, 
    allowNull: true,
    validate: {
        isBefore: function(value) {
            if(value < this.startDate) {
                throw new Error("End date has to be after start date");
            }
        },
        checkNull(value) {
            if(value === null && this.startDate !== null){
                throw new Error("End date can't be null unless start date is");
            }
        }
    }
},

},
{ timestamps: false }
);

return Event;
};