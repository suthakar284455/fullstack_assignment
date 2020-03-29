const express = require('express');
const appCtrl = require('../controllers')

const router = express.Router()

router.get('/scan_details/', appCtrl.getScanDetails);
router.post('/patient_details/', appCtrl.getPatientDetails);
router.get('/fetch_patient_details/', appCtrl.getSelectedPatientDetails);
router.get('/get_patient/', appCtrl.getPatient)
router.put('/update_patient/', appCtrl.updatePatient)

module.exports = router
