const notificationService = require("../services/notificationService");
const queueService = require("../services/queueService");

exports.getNotifications = (req, res) => {
    res.status(200).json({ message: "WebSocket notifications are active" });
};

// Called when a critical patient arrives
exports.alertCriticalPatient = (patient) => {
    const message = `🚨 Critical Patient Alert: ${patient.name} (Triage Level 1) requires immediate attention!`;
    notificationService.sendNotification(message);
};

// Called when a patient's wait time exceeds a threshold (e.g., 30 minutes)
exports.alertWaitTimeExceeded = (patient) => {
    const message = `⚠️ Patient ${patient.name} has been waiting too long! Consider prioritizing.`;
    notificationService.sendNotification(message);
};

// Called when the patient-to-staff ratio exceeds safe levels
exports.alertStaffingThreshold = (currentPatients, staffCount) => {
    const maxSafeRatio = 5;
    if (currentPatients / staffCount > maxSafeRatio) {
        const message = `⚠️ High patient-to-staff ratio detected (${currentPatients} patients, ${staffCount} staff)!`;
        notificationService.sendNotification(message);
    }
};
