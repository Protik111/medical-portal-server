const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 5000

const app = express()
app.use(cors());
app.use(bodyParser.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z2l8a.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/', (req, res) => {
  res.send('Hello World!')
})



client.connect(err => {
  const collection = client.db("medicalPortal").collection("appoinments");
  
  app.post('/sendAppoinment', (req, res) => {
      // const name = req.body.name;
      // const email = req.body.email;
      // const newAppoinment = {name, email};

      const newAppoinment = req.body;
      collection.insertOne(newAppoinment)
      .then(result => {
        console.log(result);
      })
      console.log(newAppoinment);
  })

  app.get('/showAppointment', (req, res) => {
    console.log(req.headers.authorization);
    collection.find({})
    .toArray((err, documents) =>{
      res.send(documents);
    })
  })

});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})