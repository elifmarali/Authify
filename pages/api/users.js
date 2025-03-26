import { initMongoose } from "../../libs/mongoose";
import Users from "../../models/User";

export default async function handler(req, res) {
  await initMongoose();
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await Users.find().exec();

        if (!users.length) {
          return res
            .status(404)
            .json({ success: false, message: "No users found" });
        }

        res.status(200).json({ success: true, data: users });
      } catch (error) {
        console.error("GET error:", error);
        res.status(500).json({ success: false, message: "Server error" });
      }
      break;

    case "POST":
      try {
        const newUser = await Users.create(req.body);
        res.status(201).json({ success: true, data: newUser });
      } catch (error) {
        console.error("POST error:", error);
        res.status(400).json({ success: false, message: "Invalid data" });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;

    case "PUT":
      try {
        const { userIds } = req.body;
        if (!Array.isArray(userIds) || userIds.length === 0) {
          return res.status(400).json();
        }

        const updatedUsers = await Users.updateMany(
          { _id: { $in: userIds } }, // userIds sahip olan kullanıcıları bul
          { $set: { admin: true, role: "admin" } } // admin i true role ü admin yap
        );

        if (updatedUsers.modifiedCount === 0) {
          return res
            .status(404)
            .json({ success: false, message: "No users updated" });
        }

        res
          .status(200)
          .json({ success: true, message: "Users updated successfully" });
      } catch (err) {
        console.error("PUT error : ", err.message);
        res.status(500).json({ success: false, message: "Server error" });
      }
      break;
  }
}
