const express = require("express");
const router = express.Router();
const patientController = require("../controller/patientControllers");

router.post("/add", patientController.addPatient);
router.get("/queue", patientController.getQueue);
router.put("/treat", patientController.moveToTreatment);
router.delete("/discharge/:id", patientController.dischargePatient);

module.exports = router;
