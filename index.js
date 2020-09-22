const express = require('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const app = express();

app.use(cors());
app.use(bodyParser.json());


const uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


//Get all Scholarship data
app.get('/scholarship', (req, res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("isfbd").collection("scholarship");
        collection.find().toArray((err, documents) => {
            if (err){
                console.log(err);
                res.status(500).send({message:err})
            }
            else{
                res.send(documents);
            }
        });
        //client.close();
      });
});



//Get ID Wise Scholarship data
app.get('/scholarship/:id', (req, res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const scholarshipId = Number(req.params.id)

    client.connect(err => {
        const collection = client.db("isfbd").collection("scholarship");
        collection.find({id:scholarshipId}).toArray((err, documents) => {
            if (err){
                console.log(err);
                res.status(500).send({message:err})
            }
            else{
                res.send(documents[0]);
            }
        });
        //client.close();
      });
});

//Get all Comments data
app.get('/comments', (req, res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("isfbd").collection("comments");
        collection.find().toArray((err, documents) => {
            if (err){
                console.log(err);
                res.status(500).send({message:err})
            }
            else{
                res.send(documents);
            }
        });
        //client.close();
      });
});







//Post Scholarship Data to Database
app.post('/addScholarship', (req, res) => {
    const scholarship = req.body;
    
    client.connect(err => {
        const collection = client.db("isfbd").collection("scholarship");
        collection.insertOne(scholarship, (err, result) => {
            if (err){
                res.status(500).send({message:err})
            }
            else{
                res.send(result.ops[0]);
            }
        });
        //client.close();
      });
});




//Post client Comments to Database
app.post('/postMessage', (req, res) => {
    const comments = req.body;
    
    client.connect(err => {
        const collection = client.db("isfbd").collection("comments");
        collection.insertOne(comments, (err, result) => {
            if (err){
                res.status(500).send({message:err})
            }
            else{
                res.send(result.ops[0]);
            }
        });
        //client.close();
      });
});




// //Post Scholarship (Post 2 or More Scholarship details in .XML format)
// app.post('/placeOrder', (req, res) => {
//     const product = req.body;
    
//     client.connect(err => {
//         const collection = client.db("onlineFood").collection("orders");
//         collection.insert(product, (err, result) => {
//             if (err){
//                 res.status(500).send({message:err})
//             }
//             else{
//                 res.send(result.ops[0]);
//             }
//         });
//         //client.close();
//       });
// });

const port = process.env.PORT || 3120;
app.listen(port, () => console.log('Listening to port 3120'))
