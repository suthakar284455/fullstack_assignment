const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./models/db.js");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {});

app.get("/api/scan_details/", (req, res) => {
  scanCollection.find({}).toArray((error, result) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(result);
  });
});

app.post("/api/patient_details/", (request, res) => {
  patientCollection.insert(request.body, (error, result) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(result);
  });
});

app.get("/api/fetch_patient_details/", (req, res) => {
  var from= req.query.from;
  var to= req.query.to;
  patientCollection.find({appoimentdate:{$gte:from, $lte:to}})
  .toArray((error, result) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(result);
  });
});

var ObjectID = require('mongodb').ObjectID;
app.get("/api/get_patient/", (req, res) => {
  patientCollection.find({"_id" : new ObjectID(req.query.id)})
  .toArray((error, result) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(result);
  });
});


app.put("/api/update_patient/", (req, res) => {
  console.log(req.body)
  patientCollection.findOneAndUpdate({"_id" : new ObjectID(req.body.id)},{$push : {transaction : [req.body]}}, (err, result) =>{
    if (err) return res.send(err)
    res.send(result)
  })
 
});
