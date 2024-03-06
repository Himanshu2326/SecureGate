
//? BackEnd Part :-

require('dotenv').config();
require('./DB/DataBase');
const path = require('path');
const express = require('express');
const app = express();
const hbs = require("hbs");
const Registration = require('./Models/Schema');
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { execPath } = require('process');
const port = process.env.PORT || 1000;



//? Some Required Paths:-
const PublicPath = path.join(__dirname, '../Public')
const TempPath = path.join(__dirname, "../Templates/views");
const PartialsPath = path.join(__dirname, "../Templates/Partials");



//? Things We Have To Use Or Set :-
app.use(express.static(TempPath));                // To Tell The Express That We Use Static Website Path. 
app.use(express.json());                          // To Tell The Express That the Data is Json();
app.use(express.urlencoded({ extended: false }))  // Iska Matlab Yahi hai ki jo bhi mai data likh raha hu simpily mai usse Get krna chata hu.
app.use(cookieParser())
app.use(express.static(PublicPath));



//? Setting The hbs 'View Engine'
app.set("view engine", "hbs");
app.set("views", TempPath);



//? Registering The Partils Path
hbs.registerPartials(PartialsPath)


//? Reading Or Get The Main File
app.get('/', (req, res) => {
    res.render("index")
})

app.get('/logout', async (req, res) => {
    res.render('index');
})




//? Get The Registration Part
app.get("/registration", (req, res) => {
    res.render("registration")
})

app.get("/login", (req, res) => {
    res.render("login");
})



//? Using Post Method taki User ne joo likha hai voo DataBase Me Store ho jaye
app.post('/registration', async (req, res) => {
    try {

        const Password = req.body.password;
        const Cpassword = req.body.confirmpassword;

        if (Password === Cpassword) {

            const RegisterData = new Registration({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender,
                phone: req.body.phone,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword,
            });

            const Save = await RegisterData.save();
            res.status(201).render("Home")
        }
        else {
            res.status(400).render('InvalidPassword')
        }
    }
    catch (error) {
        res.status(400).send(error)
    }
})

//? Login Data:-

app.post('/login', async (req, res) => {

    try {
        const EnterEmail = req.body.email;
        const EnterPassword = req.body.password;

        const UserData = await Registration.findOne({ email: EnterEmail });
        
         if (!UserData) {
            res.status(400).render("Invalid");
        }
        else if (UserData.EnterEmail !== null && EnterPassword === UserData.password) {
            res.status(201).render("Home");
        }
        else if (UserData.EnterEmail !== EnterEmail) {
            res.status(201).render("Invalid");
        }
        else {
            res.status(400).render("Invalid");
        }
        
    } catch (error) {
        res.status(400).send(error);
    }
})




//? Listing The Port:
app.listen(port, () => {
    console.log(`Port ${port} Is ActivaTed`);
})
