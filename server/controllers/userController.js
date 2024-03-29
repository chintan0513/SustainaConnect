const userModel = require("../models/userModels");

const registerController = async (req, res) => {
  try {
    const { name, email, phone, city } = req.body;

    // validation

    if (!name || !email || !phone || !city) {
      console.log("All fields are required");
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }

    // existing
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return res
        .status(500)
        .send({ success: false, message: "User already exists" });
    }

    const user = await userModel({ name, email, phone, city }).save();

    return res
      .status(201)
      .send({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }

  // register controller
};

module.exports = { registerController };
