import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
app.use(cors());
app.use(express.json());

const usersDb = new Map();
const demoUser = {
  id: 'demo-123',
  email: 'demo@demo.com',
  password_hash: crypto.createHash('sha256').update('demo123').digest('hex'),
  tier: 'pro',
  display_name: 'Demo User'
};
usersDb.set(demoUser.id, demoUser);

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function verifyPassword(password, hash) {
  return hashPassword(password) === hash;
}

app.post('/api/auth/login', (req, res) => {
  console.log('REQUEST:', req.body);
  const { email, password } = req.body;
  
  if (email === 'demo@demo.com' && password === 'demo123') {
    console.log('MATCH!');
    return res.json({ success: true, user: { email: demoUser.email, tier: demoUser.tier } });
  }
  
  const user = Array.from(usersDb.values()).find(u => u.email === email);
  if (user && verifyPassword(password, user.password_hash)) {
    return res.json({ success: true, user: { email: user.email } });
  }
  
  res.status(401).json({ error: 'Invalid credentials' });
});

app.listen(3001, () => console.log('TEST SERVER on 3001'));