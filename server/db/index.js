const MongoClient = require('mongodb').MongoClient;
const DATABASE_NAME = "medical_appoinment";
const CONNECTION_URL = 'mongodb://localhost:27017/'

var database;

MongoClient.connect(CONNECTION_URL, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000,
}, (error, client) => {

    if(error){
        throw error;
    }

    database = client.db(DATABASE_NAME);
    scanCollection = database.collection('scan_details');
    patientCollection = database.collection('patient_details');
   
})

