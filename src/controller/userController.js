const User = require('../model/user');

// Create
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send("Create success");
  } catch (error) {
    res.status(500).send(error);
  }
};

// Read
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update
exports.updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.send("Update success");
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("Delete success");
  } catch (error) {
    res.status(500).send(error);
  }
};