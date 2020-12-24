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

// "start:dev": "nodemon index.js",

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x3yya.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const productsCollection = client.db(`${process.env.DB_NAME}`).collection("products");
    const mensCollection = client.db(`${process.env.DB_NAME}`).collection("mens");
    const womensCollection = client.db(`${process.env.DB_NAME}`).collection("womens");
    const goodsCollection = client.db(`${process.env.DB_NAME}`).collection("goods");
    const booksCollection = client.db(`${process.env.DB_NAME}`).collection("books");
    const adminsCollection = client.db(`${process.env.DB_NAME}`).collection("admins");
    // const todosCollection = client.db(`${process.env.DB_NAME}`).collection("todos");
  
    app.post('/addGoods', (req, res) => {
        const goods = req.body;
        goodsCollection.insertOne(goods)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
    });

    app.get('/showGoods', (req, res) => {
        goodsCollection.find({})
        .toArray((err, goods) => {
            res.send(goods)
        })
    });

    app.post('/addBooks', (req, res) => {
        const books = req.body;
        booksCollection.insertOne(books)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
    });

    app.get('/showBooks', (req, res) => {
        booksCollection.find({})
        .toArray((err, books) => {
            res.send(books)
        })
    });

    app.post('/addProducts', (req, res) => {
        const products = req.body;
        console.log(products);
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

    app.get('/showProducts/:key', (req, res) => {
        productsCollection.find({key: req.params.key})
        .toArray((err, products) => {
            res.send(products[0])
        })
    });


    app.post('/addmensProducts', (req, res) => {
        const mens = req.body;
        // console.log(mens);
        mensCollection.insertOne(mens)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
    });

    app.get('/showMensProducts', (req, res) => {
        mensCollection.find({})
        .toArray((err, products) => {
            res.send(products)
        })
    });

    app.post('/addWomensProducts', (req, res) => {
        const womens = req.body;
        // console.log(womens);
        womensCollection.insertMany(womens)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
    })

    app.get('/showWomensProducts', (req, res) => {
        womensCollection.find({})
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

    app.post('/isAdmin', (req, res) => {
        const email = req.body.email;
        adminsCollection.find({email: email})
        .toArray((err, admin) => {
          res.send(admin.length > 0)
        })
    });


    app.get('/', (req, res) => {
        res.status(200).send("Hello from DB, it's working");
    });

});




app.listen(port, () => console.log(`Listening on localhost:${port}`));
