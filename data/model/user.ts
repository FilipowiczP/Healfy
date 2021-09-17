import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    firstName: String,
    lastName: String,
    birthday: Date,
    login: String,
    password: String,
  },
  {
    collection: "User",
  }
);

const User = mongoose.model("User", schema);

//    === FIND USER IN DATABASE ===
function findUser(person: Object, cb: Function) {
  User.find(person).exec(function (err, user) {
    if (err) {
      cb(err);
    } else {
      cb(null, user);
    }
  });
}

//    === CREATE NEW USER IN DATABASE ===
function addNewUser(person: Object, cb: Function) {
  let user = new User(person);
  user.save(function (err, user) {
    if (err) {
      cb(err);
    } else {
      cb(null, user);
    }
  });
}

module.exports = {
  newUser: addNewUser,
  findUser: findUser,
};
