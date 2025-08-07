import express from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

app.get('/api/resources', (req, res) => {
  const data = fs.readFileSync('./src/data/resources.json');
  res.json(JSON.parse(data));
});

app.post('/api/resources', (req, res) => {
  fs.writeFileSync('./src/data/resources.json', JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

app.listen(5050, () => console.log('API running on port 5050'));