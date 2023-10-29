const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const User = require('../lib/mongo/model/user');

class UserService {
  constructor () {}

  async getAll() {
    const allUsers = await User.find().toArray();
    return allUsers;
  }

  async getById(id) {
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw boom.notFound('User not found');
    };
    return user;
  }

  async getByEmail(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw boom.notFound('User not found');
    };
    return user;
  }

  async create(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = new User({
      ...data,
      password: hashedPassword,
    });

    await newUser.save();

    return newUser;
  }
}

module.exports = UserService;
