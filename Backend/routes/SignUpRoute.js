const UserValidation = require("../MiddleWare/Validation");
const SignUpSchema = require("../models/SignUpSchema")
const express = require("express")
const router = express.Router();
const bcrypt = require('bcrypt')

router.post("/", async (req, res) => {
    try {
        UserValidation(req);
        const { FirstName, LastName, Gender, DOB, MobileNumber, VillageTown, PostOffice, Tehsil, Distt, State, PinCode, EmailID, Password } = req.body;
        const BcryptPassword = await bcrypt.hash(Password, 10);
        const FullData = new SignUpSchema({ FirstName, LastName, Gender, DOB, MobileNumber, VillageTown, PostOffice, Tehsil, Distt, State, PinCode, EmailID, Password: BcryptPassword })
        await FullData.save();
        console.log("User Registered");
        res.send("Post request received")

        if (loading) return;
        setLoading(true);


    }
    catch (err) {
        // res.status(400).send(err.message);
        console.log(err.message);
    }
})




module.exports = router;