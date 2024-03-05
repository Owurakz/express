const express = require("express");
const bodyParser = require("body-parser");

const PORT = 4000;

const app = express();
let Db = [];

class User {
  constructor(name, age, gen) {
    this.name = name;
    this.gen = gen;
    this.age = age;
  }

  addUser() {
    Db = [...Db, { name: this.name, age: this.age, gen: this.gen }];
    return Db;
  }

  static getUsers() {
    return Db;
  }
  static updateUser(student) {
    const newDb = Db.map((item) => {
      if (item.name == student.name) {
        return student;
      }
      return item;
    });
    Db = newDb;
    return Db;
  }
  static deleteUser(name) {
    const newDb = Db.filter((item) => item.name != name);
    Db = newDb;
    return Db;
  }
}
app.use(bodyParser.json());
// for adding users
app.post("/add-user", (req, res) => {
  //    to receive data from front end

  const { name, age, gen } = req.body;
  //to create the new user
  const student = new User(name, age, gen);
  //to add the new user
  student.addUser();
  res.send({ message: "user created successfully", data: Db });
});

//getting the users
app.get("/all-students", (req, res) => {
  const students = User.getUsers();
  res.send({
    message: "the job hard",
    students,
  });
});

//update user
app.put("/update-students", (req, res) => {
  const student = req.body;
  const updateData = User.updateUser(student);
  res.send({
    message: "update hm",
    updatedData: updateData,
  });
});

app.delete("/delete-students", (req, res) => {
  const { name } = req.body;
  const newData = User.deleteUser(name);
  res.send({ message: "student deleted", newData });
});
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
