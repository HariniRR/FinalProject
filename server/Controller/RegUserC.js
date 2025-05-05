// controllers/userController.js
const UserModel = require('../Model/RegUserM');
const bcrypt = require('bcrypt');

// User Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser  = await UserModel.findOne({ email });
    if (existingUser ) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ 
      name, 
      email, 
      password: hashedPassword, 
      role: role.charAt(0).toUpperCase() + role.slice(1).toLowerCase() 
  });
      const savedUser  = await newUser .save();

    res.status(201).json({ message: "User  registered successfully", user: savedUser  });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User Signin
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and Password are required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "No records found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Password doesn't match" });
    }
    const userRole = user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase();

    req.session.user = { id: user._id, name: user.name, email: user.email, role: userRole };
    res.status(200).json({ success: true, role: userRole });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User Logout
exports.logout = (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ error: "Failed to logout" });
      res.status(200).json({ message: "Logout successful" });
    });
  } else {
    res.status(400).json({ error: "No active session found" });
  }
};

// Get Logged-in User
exports.getLoggedInUser  = (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json("Not authenticated");
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update User
exports.updateUser  = async (req, res) => {
  const { id } = req.params; 
  const { name, email, password, role } = req.body;

  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User  not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10); 
    if (role) user.role = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

    const updatedUser  = await user.save();
    res.status(200).json({ message: "User  updated successfully", user: updatedUser  });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete User
exports.deleteUser  = async (req, res) => {
  const { id } = req.params; 

  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User  not found" });
    }
    res.status(200).json({ message: "User  deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser  = await UserModel.findOne({ email });
    if (existingUser ) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let userRole = "User";  

    if (email === "admin@gmail.com") {
      userRole = "Admin"; 
    } else if (role) {
      userRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    }
    const newUser = new UserModel({ 
      name, 
      email, 
      password: hashedPassword, 
      role: userRole,
  });
  const savedUser  = await newUser .save();

    res.status(201).json({ message: "User  registered successfully", user: savedUser  });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};