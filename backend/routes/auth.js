import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const usersFile = path.join(__dirname, '../data/users.json');

const ensureUsersFile = () => {
  const dir = path.dirname(usersFile);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, JSON.stringify([]));
};

const getUsers = () => {
  ensureUsersFile();
  return JSON.parse(fs.readFileSync(usersFile, 'utf8'));
};

const saveUsers = (users) => {
  ensureUsersFile();
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    
    const users = getUsers();
    const existing = users.find((u) => u.email === email);
    if (existing) return res.status(409).json({ message: 'Email already registered' });
    
    const hash = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now().toString(), name, email, password: hash };
    users.push(newUser);
    saveUsers(users);
    
    return res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
    
    const users = getUsers();
    const user = users.find((u) => u.email === email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    
    if (!process.env.JWT_SECRET) {
      console.error('Missing JWT_SECRET');
      return res.status(500).json({ message: 'Server misconfigured' });
    }
    
    const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
