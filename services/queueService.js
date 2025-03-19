class QueueService {
    constructor() {
        this.queue = [];
    }

    addPatient(patient) {
        this.queue.push(patient);
        this.sortQueue();
    }

    getQueue() {
        return this.queue;
    }

    moveToTreatment() {
        if (this.queue.length === 0) return null;
        return this.queue.shift();
    }

    dischargePatient(id) {
        this.queue = this.queue.filter(patient => patient.id !== id);
    }

    sortQueue() {
        this.queue.sort((a, b) => a.triageLevel - b.triageLevel || a.timestamp - b.timestamp);
    }
}

module.exports = new QueueService();
