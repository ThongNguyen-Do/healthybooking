

const express = require("express");
const router = express.Router();
const medicalRecordService = require("../services/medicalRecord.service");


router.post("/", async (req, res) => {
  try {
    const record = await medicalRecordService.createMedicalRecord(req.body);
    res.json({ success: true, data: record });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


router.get("/patient/:id", async (req, res) => {
  try {
    const records = await medicalRecordService.getByPatientId(req.params.id);
    res.json({ success: true, data: records });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


router.get("/appointment/:id", async (req, res) => {
  try {
    const record = await medicalRecordService.getByAppointmentId(req.params.id);
    res.json({ success: true, data: record });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
