const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const schema = mongoose.Schema;

const userSchema = new schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.signup = async function (
  username,
  name,
  email,
  phone,
  password
) {
  if (!username || !name || !email || !phone || !password)
    throw Error('All fields must be filled.');

  if (!validator.isEmail(email)) throw Error('Enter a valid Email');

  if (!validator.isStrongPassword(password))
    throw Error('Enter a stronger password');

  const exist = await this.findOne({ email });

  if (exist) throw Error('Email already in use');

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    username,
    name,
    email,
    phone,
    password: hash,
  });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error('All fields must be filled.');

  const user = await this.findOne({ email });

  if (!user) throw Error('invalid Email or Password.');

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw Error('Invalid Email or Password.');

  return user;
};

module.exports = mongoose.model('user', userSchema);
