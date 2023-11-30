
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




//? Secret Page:-
// app.get('/secret', auth, (req, res) => { // With this auth, it goes to middleware and check what happing , Jab Tak sab thik nahi hoga tab tak next func nahi chalega
//     res.render("secret")
//     console.log(`Your Cookie is : ${req.cookies.jwt}`);
// })

//? Logout :-
// app.get('/logout', auth, async (req, res) => { // auth is checking for token is there or not


app.get('/logout', async (req, res) => {

    // try {
    // For Single Logout:-
    // req.User.tokens = req.User.tokens.filter((currentElement) => {
    //     return currentElement.token !== req.token
    // })

    // For All Device Logout:-
    // req.User.tokens = [];


    // res.clearCookie("jwt");
    console.log('Log out Succesfully');

    // await req.User.save();
    res.render('index');

    // } catch (error) {
    // res.status(500).send(error)
    // }
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

            // Generating Tokens :-

            // const token = await RegisterData.generateToken();
            // console.log("The Token Is:", token);


            /*
             >> Generating Cookie:-

             -> res.cookie function is used to set the cookie name to Value.
             -> The Value parameter may be a String or Object Converted to JSON.
            
            */
            // res.cookie("jwt", token, {
            //     expires: new Date(Date.now + 30000),
            //     httpOnly: true
            // });
            // console.log(cookie);

            //   Saving Registered Data:--
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

        const UserEmail = await Registration.findOne({ email: EnterEmail });
        // const UserName = await Registration.findOne({'email': 'ku@gmail.com'},{'firstname':1, _id:0})


        // Generating Tokens:-
        // const token = await RegisterData.generateToken();

        // console.log("Token:", Token)

        // Generating Cookies:-
        // res.cookie("jwt", token, {
        //     expires: new Date(Date.now + 30000),
        //     httpOnly: true
        // });

        //   >>   Using bcrypt

        // const isEmail = await bcrypt.compare(EnterPassword, UserEmail.password);  // For Checking brypt , Note Password Should Store  In bcrypt 
        // console.log(isEmail);

        // if (isEmail) {
        //     res.status(201).render("index");
        // }

        // console.log(EnterPassword);
        // console.log(UserEmail.password);
        console.log(`Entered : ${EnterEmail}`);
        console.log(`Saved : ${UserEmail.email}`);


        // let WelcomeName = UserName.firstname;


        if (EnterPassword === UserEmail.password) {
            res.status(201).render("Home");

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
