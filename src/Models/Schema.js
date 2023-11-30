
//  Creating A Schema For Our DataBase:-

const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const MySchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    phone: {
        type: Number,
        required: true,
        unique: true,
        min: 10,
    },

    password: {
        type: String,
        required: true,
        unique: true,
    },

    confirmpassword: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]

});

// Generating Token:-
// MySchema.methods.generateToken = async function () {

//     try {

//         let Token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        // console.log("Your Token :", Token);
//         this.tokens = this.tokens.concat({ token: Token });
//         await this.save();
//         return Token;

//     } catch (error) {
//         res.send("The Error Part : " + error)
//         console.log("The Error Part : " + error)
//     }

// }

// Security Part Hashing And Encription:-
// --> Work as middleware <-- means jo bhi hum Work Do Chizooo ke bich me krte hai , jhse yaha kr rahr hai. 
/*
   1). Hashing     : One Way Communication  , bcrypt Hashing Is Most Secure 
   2). Encription  : Encode <-> Decode. i.e   himanshu ->  ibnqouas -> himanshu

*/

// MySchema.pre("save", async function (next) {

    // if(this.isModified(password)){
//     this.password = await bcrypt.hash(this.password, 10);

//     this.confirmpassword = await bcrypt.hash(this.password, 10);
    // }
//     next();                          // We use next() To Run The Next Process (save) , else it will continous done loading process.

// })


// Creating Documents:-
const Registration = new mongoose.model("Registration", MySchema);

module.exports = Registration;