const express = require("express");
const App = express();
const BodyParser = require("body-parser");
const cors = require("cors");
const ConnectDB = require("./Database/ConnectDB");

// MiddleWare
App.use(BodyParser.json());

// Cors Connect
const CorsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
App.use(cors(CorsOptions));

// Routes
const SignUpRoute = require("./routes/SignUpRoute");
const LoginRoute = require("./routes/LoginRoute");
const dashboardRoutes = require("./routes/DashboardGetUserDetails");
const SellPageRoute = require("./routes/SellPageRoute");
const GetBookCards = require("./routes/GetBookCards");

App.use("/SignUp", SignUpRoute);
App.use("/Login", LoginRoute);
App.use("/Dashboard", dashboardRoutes);
App.use("/Sell", SellPageRoute); // ✅ contains user/:userId route
App.use("/PostedBooks", GetBookCards);

// Database + Server
ConnectDB().then(() => {
  App.listen(5000, () => {
    console.log("✅ Server running at http://localhost:5000");
  });
});
