import mongoose, { model, models } from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  username: String,
  email: String,
  password: String,
  role: String,
  admin:Boolean
});

const Users = models.Users || model("Users", UserSchema, "Users");

export default Users;
