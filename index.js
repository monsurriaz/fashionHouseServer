const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const fileUpload = require('express-fileupload');


const app = express()
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('products'));

const port = process.env.PORT || 5000;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x3yya.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: 
    true });
client.connect(err => {
    const productsCollection = client.db(`${process.env.DB_NAME}`).collection("products");
    const adminsCollection = client.db(`${process.env.DB_NAME}`).collection("admins");
  

app.get('/', (req, res) => {
    res.status(200).send("Hello from DB, it's working");
});

app.post('/addProducts', (req, res) => {
    const products = req.body;
    productsCollection.insertOne(products)
    .then(result => {
        res.send(result.insertedCount > 0)
    })
});

app.get('/showProducts', (req, res) => {
    productsCollection.find({})
    .toArray((err, products) => {
        res.send(products)
    })
});


app.post('/addAdmin', (req, res) => {
    const admin = req.body;
    adminsCollection.insertOne(admin)
    .then(result => {
        res.send(result.insertedCount > 0)
    })
});

app.get('/showAdmin', (req, res) => {
    adminsCollection.find({})
    .toArray((err, admins) => {
        res.send(admins)
    })
});

});




app.listen(port, () => console.log(`Listening on localhost:${port}`));
