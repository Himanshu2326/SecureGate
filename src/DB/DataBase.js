
//  Creating Connection :-

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://hp0682854:Him23112003@cluster0.py7d0ot.mongodb.net/?retryWrites=true&w=majority")
.then(()=>console.log("MongoDB Connected"))
.catch((er)=>console.log(er));
