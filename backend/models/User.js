import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOCAL_DB_PATH = path.join(__dirname, '../data/users.json');

// Ensure data directory exists
try {
  const dataDir = path.join(__dirname, '../data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
} catch (err) {
  console.error('Error creating database folder:', err.message);
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false, // don't include password by default in queries
    },
  },
  { timestamps: true }
);

const MongooseUser = mongoose.model('User', UserSchema);

class MockUser {
  constructor(data) {
    this._id = data._id || Math.random().toString(36).substring(2, 9);
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.createdAt = data.createdAt || new Date();
  }

  static getLocalUsers() {
    try {
      if (!fs.existsSync(LOCAL_DB_PATH)) {
        fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify([]));
      }
      return JSON.parse(fs.readFileSync(LOCAL_DB_PATH, 'utf-8'));
    } catch (err) {
      console.error('Error reading local db:', err);
      return [];
    }
  }

  static saveLocalUsers(users) {
    try {
      fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(users, null, 2));
    } catch (err) {
      console.error('Error writing to local db:', err);
    }
  }

  static findOne({ email }) {
    return {
      select(fields) {
        return this;
      },
      then(resolve, reject) {
        try {
          const users = MockUser.getLocalUsers();
          const user = users.find((u) => u.email === email.toLowerCase());
          resolve(user ? new MockUser(user) : null);
        } catch (err) {
          reject(err);
        }
      }
    };
  }

  static findById(id) {
    return {
      then(resolve, reject) {
        try {
          const users = MockUser.getLocalUsers();
          const user = users.find((u) => u._id === id);
          resolve(user ? new MockUser(user) : null);
        } catch (err) {
          reject(err);
        }
      }
    };
  }

  async save() {
    const users = MockUser.getLocalUsers();
    if (users.some((u) => u.email === this.email.toLowerCase())) {
      const err = new Error('Duplicate key');
      err.code = 11000;
      throw err;
    }
    users.push({
      _id: this._id,
      name: this.name,
      email: this.email,
      password: this.password,
      createdAt: this.createdAt,
    });
    MockUser.saveLocalUsers(users);
    return this;
  }
}

// Proxy constructor & model methods to route based on global.useLocalDB
const UserProxy = new Proxy(MongooseUser, {
  // Direct function call: e.g. User.findOne()
  get(target, prop) {
    if (global.useLocalDB) {
      if (prop === 'prototype') return MockUser.prototype;
      return MockUser[prop];
    }
    return MongooseUser[prop];
  },
  // To handle 'new User()' constructs
  construct(target, args) {
    if (global.useLocalDB) {
      return new MockUser(...args);
    }
    return new MongooseUser(...args);
  }
});

export default UserProxy;
