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

// Upcoming Events
app.get('/api/upcoming-events', (req, res) => {
  const data = fs.readFileSync('./src/data/upcomingEvents.json');
  res.json(JSON.parse(data));
});

app.post('/api/upcoming-events', (req, res) => {
  fs.writeFileSync('./src/data/upcomingEvents.json', JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

// Past Events
app.get('/api/past-events', (req, res) => {
  const data = fs.readFileSync('./src/data/pastEvents.json');
  res.json(JSON.parse(data));
});

app.post('/api/past-events', (req, res) => {
  // Ensure each new event has a createdAt field if missing
  const events = req.body.map(ev => {
    if (!ev.createdAt) {
      return { ...ev, createdAt: new Date().toISOString() };
    }
    return ev;
  });
  fs.writeFileSync('./src/data/pastEvents.json', JSON.stringify(events, null, 2));
  res.json({ success: true });
});

app.get('/api/resources', (req, res) => {
  const data = fs.readFileSync('./src/data/resources.json');
  res.json(JSON.parse(data));
});

app.post('/api/resources', (req, res) => {
  fs.writeFileSync('./src/data/resources.json', JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

// House Council
app.get('/api/house-council', (req, res) => {
  const data = fs.readFileSync('./src/data/houseCouncil.json');
  res.json(JSON.parse(data));
});

app.post('/api/house-council', (req, res) => {
  fs.writeFileSync('./src/data/houseCouncil.json', JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

// Regional Coordinators
app.get('/api/regional-coordinators', (req, res) => {
  const data = fs.readFileSync('./src/data/regionalCoordinators.json');
  res.json(JSON.parse(data));
});

app.post('/api/regional-coordinators', (req, res) => {
  fs.writeFileSync('./src/data/regionalCoordinators.json', JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

// Web Ops Team
app.get('/api/web-ops-team', (req, res) => {
  const data = fs.readFileSync('./src/data/webOpsTeam.json');
  res.json(JSON.parse(data));
});

// PR Team
app.get('/api/pr-team', (req, res) => {
  const data = fs.readFileSync('./src/data/prTeam.json');
  res.json(JSON.parse(data));
});

// Outreach Team
app.get('/api/outreach-team', (req, res) => {
  const data = fs.readFileSync('./src/data/outreachTeam.json');
  res.json(JSON.parse(data));
});

// POST routes (for updating)
app.post('/api/web-ops-team', (req, res) => {
  fs.writeFileSync('./src/data/webOpsTeam.json', JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

app.post('/api/pr-team', (req, res) => {
  fs.writeFileSync('./src/data/prTeam.json', JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

app.post('/api/outreach-team', (req, res) => {
  fs.writeFileSync('./src/data/outreachTeam.json', JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

app.listen(5050, () => console.log('API running on port 5050'));