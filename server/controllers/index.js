const ObjectID = require('mongodb').ObjectID;
require('../db');

getScanDetails = (req, res) => {
    scanCollection.find({}).toArray((error, result) => {
        if (error) {
          return res.status(500).send(error);
        }
        res.send(result);
    });
}

getPatientDetails = (req, res) => {
    patientCollection.insert(req.body, (error, result) => {
        if (error) {
          return res.status(500).send(error);
        }
        res.send(result);
    });
}

getSelectedPatientDetails = (req, res) => {
    var from= req.query.from;
    var to= req.query.to;
    patientCollection.find({appoimentdate:{$gte:from, $lte:to}})
    .toArray((error, result) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.send(result);
    });
}

getPatient = (req, res) => {
    patientCollection.find({"_id" : new ObjectID(req.query.id)})
    .toArray((error, result) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.send(result);
    });
}

updatePatient = (req, res) => {
    patientCollection.findOneAndUpdate({"_id" : new ObjectID(req.body.id)},{$push : {transaction : [req.body]}}, (err, result) =>{
        if (err) return res.send(err)
        res.send(result)
      })
     
}
module.exports = {
    getScanDetails,
    getPatientDetails,
    getSelectedPatientDetails,
    getPatient,
    updatePatient,
}
