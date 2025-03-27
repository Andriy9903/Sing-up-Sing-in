const express = require('express');
const cors = require('cors');
const { encodePassword, generateToken } = require('./hash');
const app = express();

app.use(cors());
app.use(express.json());

const users = [];

app.post('/sign-up', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required!' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password length should be minimum 8 symbols!' });
  }

  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'User with this email already exists!' });
  }

  const hashedPassword = encodePassword(password);

  users.push({ email, password: hashedPassword });

  res.status(201).json({ message: 'Реєстрація успішна!' });
});

app.post('/sign-in', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required!' });
  }

  const user = users.find(u => u.email === email);

  if (!user || user.password !== encodePassword(password)) {
    return res.status(401).json({ message: 'Incorrect email or password!' });
  }

  const token = generateToken(email);
  res.status(200).json({ "token" : generateToken(email) });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
