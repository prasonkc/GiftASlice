const Userbase = require("../models/userbase");
const bcrypt = require("bcrypt");


// Signup route
exports.signup = async (req, res) => {
    try {
    console.log("Post Request initiated");
    const { name, dob, email, password } = req.body;

    // Hash the password and save
    const hashedPassword = await bcrypt.hash(password, 11);
    const databaseObject = new Userbase({
      name,
      dob,
      email,
      password: hashedPassword,
    });
    await databaseObject.save();

    // Store id in session
    req.session.userId = databaseObject._id;

    res.json({
      message: "Registration successful",
      userId: req.session.userId,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
} 

// Login Route
exports.login = async (req, res) => {
    const { email, password } = req.body;

  // Find the user by email address
  const user = await Userbase.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  // Check password by matching user password to hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid password" });

  // Store id in session
  req.session.userId = user._id;
  req.session.userName = user.name;

  // Redirect the login
  try {
    res.json({
      message: "Login successful",
      userId: req.session.userId,
      userName: req.session.userName,
    });
  } catch (e) {
    console.log(e);
  }
}

// Send whether session is established or not
exports.session = (req, res) => {
    if (req.session.userId) {
    res.json({
      loggedIn: true,
      userId: req.session.userId,
      userName: req.session.userName,
    });
  } else {
    res.json({ loggedIn: false });
  }
}

// Logout the user
exports.logout = (req, res) => {
      // Destroy the session if session exists
  if (req.session) {
    req.session.destroy((err) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ success: false, error: "Session destruction failed" });
        }
        // Clear cookie on logout
        res.clearCookie("connect.sid");
        res.status(200).json({ success: true });
      })
  } else {
    res.status(400).send({ success: false });
  }
}