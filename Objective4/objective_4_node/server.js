'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const firebase = require("firebase");
firebase.initializeApp({
  apiKey: "AIzaSyCeGIwvYlArB3BgcuhrFESO-n59S3HkSF8",
  authDomain: "challenges-79fc3.firebaseapp.com",
  databaseURL: "https://challenges-79fc3.firebaseio.com",
  projectId: "challenges-79fc3",
  storageBucket: "challenges-79fc3.appspot.com",
  messagingSenderId: "880127272078"
});
const db = firebase.firestore();
const { dataClasses, search } = require('hibp');


const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const addUserToFirseStore = (name,surname,email,pwnd, cb)=>{
  db.collection("users").add({
    name: name,
    surname: surname,
    email:email,
    isBreached:pwnd
  })
  .then(function(docRef) {
      console.log("User added with ID: ", docRef.id);
      cb(null,docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
      cb(true,null);
  });
}

app.get("/",(req,res)=>{
  console.log("test")
  res.status(200).send("Node server");
})
app.get('/add_user/:name/:surname/:email', (req, res) => {
  if(!req.params.name || !req.params.surname || !req.params.email ){
    console.log(req.params)
    return res.status(400).send("Need name, surname and email in params");
  }else{
    console.log(req.params)
    let name = req.params.name;
    let surname = req.params.surname;
    let email = req.params.email
    console.log(email)
    search(email)
    .then(data => {
      if (data.breaches || data.pastes) {
        addUserToFirseStore(name,surname,email,true,(err,id)=>{
          if(err){
            res.status(500).send("Unable to add user.")
          }else{
            res.status(200).send(`Added user with id: ${id}`)
          }
        })
      } else {
        addUserToFirseStore(name,surname,email,false,(err,id)=>{
          if(err){
            res.status(500).send("Unable to add user.")
          }else{
            res.status(200).send(`Added user with id: ${id}`)
          }
        })
      }
    })
    .catch(err => {
      res.status(500).send("Unable to check if user was pwnd.")
      console.log(err.message);
    });
  }
  
});

app.listen(PORT, HOST);
console.log(`Running node server on http://${HOST}:${PORT}`);