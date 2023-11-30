
//  Creating Connection :-

const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/Registered")
.then(()=>console.log("MongoDB Connected"))
.catch((er)=>console.log(er));
