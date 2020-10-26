import express from 'express';

const app = express();

app.get('/', async (req, res) => res.json({ message: 'Hello'}));

app.listen(3333);
