const User = require('../model/User');

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: ['id', 'username', 'email', 'role', 'createdAt', 'updatedAt']
  });
  return users;
};

module.exports = {
  getAllUsers
};
