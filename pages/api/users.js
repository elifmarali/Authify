import { initMongoose } from "@/lib/mongoose";
import Users from "@/models/User";

export default async function handler(req, res) {
  await initMongoose();
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await Users.find().exec();
        console.log("Users found: ", users);

        if (!users.length) {
          return res.status(404).json({ success: false, message: "No users found" });
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
  }
}
