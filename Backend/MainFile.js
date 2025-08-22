const express = require("express")
const App = express();
const BodyParser = require("body-parser");
const cors = require("cors");
const ConnectDB = require("./Database/ConnectDB");


// MiddleWare
App.use(BodyParser.json());


// Cors Connect

const CorsOptions = {
    origin:"http://localhost:5173",
    credentials: true,
}

App.use(cors(CorsOptions))

// Routess
const SignUpRoute = require("./routes/SignUpRoute")
const LoginRoute = require("./routes/LoginRoute")
const dashboardRoutes = require("./routes/GetUserDetails");




App.use('/SignUp', SignUpRoute);
App.use('/Login',LoginRoute)
App.use("/Dashboard", dashboardRoutes);

// Database 
 ConnectDB().then(()=>{
    //  Server
        App.listen(5000, () => {
            console.log("Server is running http://localhost:5000")
        })
 })





