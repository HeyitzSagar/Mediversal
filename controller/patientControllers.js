const queueService = require("../services/queueService");
const notificationController = require('./notificationController')

exports.addPatient = (req, res) => {
    const { id, name, triageLevel } = req.body;
    if (!id || !name || !triageLevel) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const patient = { id, name, triageLevel, timestamp: Date.now() };
    queueService.addPatient(patient);

    // Alert if the patient is Level 1 (Critical)
    if (triageLevel === 1) {
        notificationController.alertCriticalPatient(patient);
    }

    res.status(201).json({ message: "Patient added successfully" });
};

exports.getQueue = (req, res) => {
    res.status(200).json(queueService.getQueue());
};

exports.moveToTreatment = (req, res) => {
    const patient = queueService.moveToTreatment();
    if (!patient) return res.status(404).json({ message: "No patients in queue" });
    res.status(200).json({ message: "Patient moved to treatment", patient });
};

exports.dischargePatient = (req, res) => {
    const { id } = req.params;
    queueService.dischargePatient(id);
    res.status(200).json({ message: "Patient discharged successfully" });
};
