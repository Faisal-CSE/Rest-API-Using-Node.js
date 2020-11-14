const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

//Parse application/json
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


//create database connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'apitestdb'
});

//connect to database
conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
});

//show all users
app.post('/api/users',(req, res) => {
    let sql = "SELECT * FROM personal";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});


//add new user
app.post('/api/addUser',(req, res) => {
    var userFName = req.body.first_name;
    var datetime = new Date();
    //console.log(datetime);
    let data = {first_name: req.body.first_name, last_name: req.body.last_name, birthdate: req.body.birthdate, mobile: req.body.mobile, created_on: datetime};
    //console.log(data);
    let sql = "INSERT INTO personal SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": "Successfully Added"}));
    });
});
   
  //update user
  app.post('/api/updateUser',(req, res) => {
    var fname= req.body.first_name;
    var lname = req.body.last_name;
    var birthdate = req.body.birthdate;
    var mobile = req.body.mobile;
    var uId = req.body.uId;
    //console.log(birthdate)

    let sql = "UPDATE personal SET first_name='"+fname+"', last_name='"+lname+"', birthdate='"+birthdate+"', mobile='"+mobile+"' WHERE Id="+uId;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": "Successfully Updated"}));
    });
});
   
  //Delete user
  app.post('/api/deleteUser',(req, res) => {
    var uId = req.body.uId;
    let sql = "DELETE FROM personal WHERE Id = "+uId;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": "Successfully deleted!"}));
    });
});



//Server listening
app.listen(3000,() =>{
    console.log('Server started on port 3000...');
});