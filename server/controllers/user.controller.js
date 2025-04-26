const User = require("../model/user.model");

// Get user by ID
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

// Update user
const updateUser = async (req, res) => {
  const { name, email } = req.body;
  console.log(name, email, req.user.id, "line 21");
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(name, email, "line 31");
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user profile" });
  }
};

module.exports = {
  getUser,
  updateUser,
};
