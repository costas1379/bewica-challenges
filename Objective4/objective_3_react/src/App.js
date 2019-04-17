import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const firebase = require("firebase");
firebase.initializeApp({
  apiKey: "AIzaSyCeGIwvYlArB3BgcuhrFESO-n59S3HkSF8",
  authDomain: "challenges-79fc3.firebaseapp.com",
  databaseURL: "https://challenges-79fc3.firebaseio.com",
  projectId: "challenges-79fc3",
  storageBucket: "challenges-79fc3.appspot.com",
  messagingSenderId: "880127272078"
});
var db = firebase.firestore();

class App extends Component {
  constructor(props){
    super(props);
    this.state = {breachedUsers:[],form:{},diabled:true}
    this.handleNewUsers = this.handleNewUsers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addUser = this.addUser.bind(this);
    db.collection("users").onSnapshot((doc)=>{
      let breachedUsers = [];
      db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.data().isBreached){
             breachedUsers.push(doc.data())
            }
        });
      this.handleNewUsers(breachedUsers);
      });
    });

  }
  handleChange(event){
    let data = this.state.form
    data[event.target.name]=event.target.value
    let disabled = (!data.name || !data.surname || !data.email) ? true : false
    this.setState({
      form:data,
      disabled:disabled
    })

  }
  addUser(){
    axios.get(`http://localhost:5000/add_user/${this.state.form.name}/${this.state.form.surname}/${this.state.form.email}`).then((response)=>{
      alert(response.data);
    }).catch((err)=>{
      console.log(err);
      alert("Unable to add user.")
    })
  }
  handleNewUsers(breachedUsers){
    this.setState({
      breachedUsers:breachedUsers
    })
  }
  render() {
    return(
      <div className="main">
        <h1>Objective 3 - React</h1>
        <div>
          <h2>Add new user:</h2>
          <form>
            <div className="fg">
              <label for="name">Name: </label>
              <input type="text" value={this.state.form.name} onChange={this.handleChange} name="name"/>
            </div>
            <div className="fg"> 
              <label for="surname">Surname: </label>
              <input type="text" value={this.state.form.surname} onChange={this.handleChange} name="surname"/>
            </div>
            <div className="fg">
              <label for="email">Email:</label>
              <input type="text" value={this.state.form.email} onChange={this.handleChange} name="email"/>
            </div>
          </form>
          <button className="btn" disabled={this.state.disabled} onClick={this.addUser}>Add user</button>
        </div>
        <div>
          <h3>Breached Users</h3>
          {
            (this.state.breachedUsers.length > 0)?
                <table>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <th>Surname</th>
                      <th>Email</th>
                    </tr>
                    {this.state.breachedUsers.map((user)=>{
                      return(
                        <tr>
                          <td>{user.name}</td>
                          <td>{user.surname}</td>
                          <td>{user.email}</td>
                        </tr>
                      )
                    })}
                    </tbody>
                </table>
            :
              <p>No breached users.</p>
          }
        </div>
      </div>
    )
  }
}

export default App;
