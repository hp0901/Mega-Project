const express = require("express")
const router = express.Router()
const { contactUsController } = require("../controllers/contactUsController");


console.log("inside contact us route"); 
router.post("/contact", contactUsController)

module.exports = router